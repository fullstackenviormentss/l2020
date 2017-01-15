require 'koala'
require 'fileutils'
require 'mini_magick'

class FB

  def initialize(post, created_time)
    @post = post
    @created_time = created_time
  end

  def created_time
    DateTime.parse(@created_time)
  end

  def self.new_connection
    @graph = Koala::Facebook::API.new(ENV['FACEBOOK_ACCESS_TOKEN'], ENV['FACEBOOK_SECRET'])
  end

  def self.get(meth, username, limit)
    posts_FB = []

    FB.new_connection

    posts_FB = FB.method(meth).call(username, limit)

    return posts_FB.map{ |post| FB.new(post, post[:created_time]) }
  end

  def self.connections(username, limit)
    return Tools.transform_keys_to_symbols(@graph.get_connections(username,'posts',{limit: limit}))
  end

  def self.get_object(object)
    return Tools.transform_keys_to_symbols(@graph.get_object(object))
  end

  # Get picture with the following standard size: thumbnail, album, normal
  # Don't return width & height data
  def self.get_picture_data(object_id, size)
    return Tools.transform_keys_to_symbols(@graph.get_picture_data(object_id, :type => size))
  end

  def post_valid?
    !@post[:message].nil? && ['photo','video'].include?(@post[:type]) || (@post[:type] == 'link' && @post[:status_type] == 'shared_story')
  end

  def render
    html = String.new

    if post_valid?
      html << "<div class='facebook_status col-md-4 item #{@post[:type]} #{"text_only" if post_text_only?}'><div class='wrap_status'>"

      html << photo if has_photo?
      html << video if has_video?
      html << shared_story if has_shared_story?

      html << user_info
      html << message
      html << meta_info

      html << "</div></div>"
    end

    puts @post[:id]
    return html || ""
  end

  def post_text_only?
    !defined?(@post[:type])
  end

  # Photo

  def has_photo?
    @post[:type] == 'photo'
  end

  def photo_format(width, height)
    return "square" if width == height
    return "landscape" if width > height
    return "portrait" if height > width
  end

  def photo
    photo_data = FB.get_object(@post[:object_id])
    return  <<-CODE
        <img src="#{photo_data[:source]}" class="#{photo_format(photo_data[:width].to_i, photo_data[:height].to_i)}" width="#{photo_data[:width]}" height="#{photo_data[:height]}"/>
    CODE
  end

  # Video

  def has_video?
    @post[:type] == 'video'
  end

  def is_facebook_video?
    @post[:source] =~ /^https:\/\/(video.xx.fbcdn.net|scontent.xx.fbcdn.net)/i
  end

  def parse_video(link)
    # Youtube custom link
    return link.gsub('autoplay=1', 'autoplay=0&rel=0&amp;showinfo=0')
  end

  def video
    if is_facebook_video?
      <<-CODE
        <video preload="auto" controls>
          <source src="#{@post[:source]}" type="video/mp4">
          Your browser does not support the video tag.
          <a href="#{@post[:link]}"><img src="#{@post[:picture]}"/></a>
        </video>
      CODE
    else # Youtube, Dailymotion, Vimeo, more?
      <<-CODE
          <iframe src="#{parse_video(@post[:source])}" autoplay="0" frameborder="0" badge="0" portrait="0" byline="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
      CODE
    end
  end

  # Message

  def parse_message(text)
    text = text.gsub(/http[s]:\/\/[a-z0-9._\/-]+/i, '<a href="\0">\0</a>')
    text = text.gsub(/\#([a-z0-9âãäåæçèéêëìíîïðñòóôõøùúûüýþÿı_-]+)/i, '<a class="hashtag" href="https://www.facebook.com/hashtag/\1">#\1</a>')
    return text
  end

  def message
    <<-CODE
      <div class="status_box">
        <p class="status">#{parse_message(@post[:message].truncate(180))}</p>
      </div>
    CODE
  end

  # Shared Story

  def has_shared_story?
    @post[:type] == 'link' && @post[:status_type] == 'shared_story'
  end

  def has_shared_story_picture?
    @post.has_key?(:picture) && @post[:picture] != ''
  end

  def path_exist?(path)
    File.exist? File.expand_path path
  end

  def create_path(path)
    FileUtils::mkdir_p path
  end

  def parse_shared_story_picture(link)
    link_parsed = CGI.parse(URI.parse(link).query)
    return link_parsed.has_key?("url") ? link_parsed["url"][0] : link
  end

  def shared_story_picture_resize(image_url)
    image = MiniMagick::Image.open(image_url)
    if image.type == 'PNG'
      image.combine_options do |c|

        c.background '#FFFFFF' # for transparent png
        c.alpha 'remove'
      end
    end
    image.resize "300x300>" # proportional, only if larger
    image.format 'jpg'
    image.write("images/social_wall/#{@post[:id]}.jpg")
  end

  def shared_story_picture
    create_path('images/social_wall') if !path_exist?('images/social_wall')

    image_url = parse_shared_story_picture(@post[:picture])
    shared_story_picture_resize(image_url)

    <<-CODE
      <p class="story_img"><a href="#{@post[:link]}"><img src="images/social_wall/#{@post[:id]}.jpg"></a></p>
    CODE
  end

  def shared_story
    <<-CODE
      <blockquote cite="#{@post[:link]}">
        #{shared_story_picture if has_shared_story_picture?}
        <div class="wrap_story">
          <cite>#{@post[:caption]}</cite>
          <h1><a href="#{@post[:link]}">#{@post[:name]}</a></h1>
          <p class="desc">#{@post[:description]}</p>
          <p class="read_more"></p>
        </div>
      </blockquote>
    CODE
  end

  # Infos

  def user_info
    username = FB.get_object(@post[:from][:id])[:username]
    picture = FB.get_picture_data(@post[:from][:id], 'normal')
    <<-CODE
      <div class="user_info row">
        <p class="profile_image col-xs-3">
          <a href="https://www.facebook.com/#{username}"><img src="#{picture[:data][:url]}" /></a>
        </p>
        <div class="wrap_user_name col-xs-8">
          <h1 class="user"><a href="https://www.facebook.com/#{username}">#{@post[:from][:name]}</a></h1>
          <h2 class="username"><a href="https://www.facebook.com/#{username}">@#{username}</a></h2>
        </div>
        <p class="icon_social col-xs-1">
          <a href="https://www.facebook.com/#{username}"><span class="icon-facebook"></span></a>
        </p>
      </div>
    CODE
  end

  def meta_info
    <<-CODE
      <p class="meta_info">
        <time pubdate datetime="#{created_time}">#{created_time}</time>
        <a class="icon-share" href="http://www.facebook.com/share.php?v=4&amp;src=bm&amp;u=#{CGI.escape(@post[:link])}"></a>
      </p>
    CODE
  end

end
