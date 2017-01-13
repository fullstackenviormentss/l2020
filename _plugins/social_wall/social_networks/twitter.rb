require 'twitter'

class TW

  def initialize(post, created_time)
    @post = post
    @created_time = created_time
  end

  def created_time
    DateTime.parse(@created_time)
  end

  def self.new_connection
    @clientTW = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_CONSUMER_KEY']
      config.consumer_secret     = ENV['TWITTER_CONSUMER_SECRET']
      config.access_token        = ENV['TWITTER_OAUTH_TOKEN']
      config.access_token_secret = ENV['TWITTER_OAUTH_TOKEN_SECRET']
    end
  end

  def self.get(meth, username, include_rts, count)
    posts_TW = []

    TW.new_connection

    posts_TW = TW.method(meth).call(username, include_rts, count.to_i)

    # Change symbol of :created_at to the facebook one :created_time
    posts_TW = Tools.rename_symbole(posts_TW, :created_at, :created_time)

    return posts_TW.map{ |post| TW.new(post, post[:created_time])}
  end

  def self.hashtag_timeline(hashtag)
    return @clientTW.search(hashtag + " -rt").first
  end

  # Recursive call to match the real number of tweets with the user's input -> in user_timeline number of tweets are counted before others filters like include_rts or exclude_replies
  def self.user_timeline(username, include_rts, count, count_diff=count)
    posts_TW = @clientTW
          .user_timeline(username,{
              :include_rts => include_rts,
              :tweet_mode => 'extended',
              :exclude_replies => true,
              :count => count_diff })
          .map(&:attrs) #also known as: to_h
    return count > posts_TW.length ? user_timeline(username, include_rts, count, count_diff += count - posts_TW.length) : posts_TW
  end

  def render
    html = String.new

    html << "<div class='twitter_status col-md-4 item#{" quoted" if has_quoted_status?} #{"text_only" if post_text_only?} #{"link_not_fetch" if has_link_not_fetch?}'><div class='wrap_status'>"

    html << photo(:small) if has_photo?
    html << video('32000') if has_video?
    html << link if has_link?
    html << quoted_status if has_quoted_status?

    html << user_info
    html << message
    html << meta_info

    html << "</div></div>"

    puts @post[:id]
    return html
  end

  def post_text_only?
    !defined?(@post[:extended_entities][:media][0][:type]) && !has_quoted_status? && !has_link?
  end

  def parse_text(text)
    text = text.gsub(/http[s]:\/\/t.co[a-z0-9._\/-]+$/i,'') # Remove the tweet's url included in the text at the end
    text = text.gsub(/http[s]:\/\/[a-z0-9._\/-]+/i, '<a href="\0">\0</a>')
    text = text.gsub(/@([a-z0-9âãäåæçèéêëìíîïðñòóôõøùúûüýþÿı_]+)/i, '<a class="mention" href="http://twitter.com/\1">@\1</a>')
    text = text.gsub(/\#([a-z0-9âãäåæçèéêëìíîïðñòóôõøùúûüýþÿı_-]+)/i, '<a class="hashtag" href="http://twitter.com/search?q=%23\1">#\1</a>')
    return text
  end

  # Photos

  def photo_format(width, height)
    return "square" if width == height
    return "landscape" if width > height
    return "portrait" if height > width
  end

  def has_photo?
    defined?(@post[:extended_entities][:media][0][:type]) && @post[:extended_entities][:media][0][:type] = "photo"
  end

  # @params size: thumb, small, medium, large
  def photo(size)
    photo_data = @post[:extended_entities][:media][0]
    <<-CODE
      <img src="#{photo_data[:media_url]}:#{size}" class="#{photo_format(photo_data[:sizes][size][:w].to_i, photo_data[:sizes][size][:h].to_i)}" width="#{photo_data[:sizes][size][:w]}" height="#{photo_data[:sizes][size][:h]}" />
    CODE
  end

  # Videos

  def has_video?
    defined?(@post[:extended_entities][:media][0][:video_info])
  end

  def video(bitrate)
    puts @post[:extended_entities]
    <<-CODE

    CODE
  end

  # Quoted Status

  def has_quoted_status?
    @post[:is_quote_status] && defined?(@post[:quoted_status][:entities][:urls][0][:expanded_url]) # if expanded_url doesn't exist it means that the shared tweet is not available anymore
  end

  def has_quoted_status_with_photo?
    defined?(@post[:quoted_status][:entities][:media][0][:media_url]) && @post[:quoted_status][:entities][:media][0][:media_url] !=~ / youtube.com |vimeo.com| dailymotion.com/i
  end

  def parse_video(link)
    # Youtube custom link
    return link.gsub('autoplay=1', 'autoplay=0&rel=0&amp;showinfo=0')
  end

  def parse_profile_image(link)
    # Youtube custom link
    return link.gsub('_normal', '')
  end

  def quoted_status
    <<-CODE
        <blockquote cite="#{@post[:quoted_status][:entities][:urls][0][:expanded_url]}">
            #{quoted_status_photo if has_quoted_status_with_photo?}
            <div class="wrap_story">
              <h1>#{@post[:quoted_status][:user][:name]}</h1>
              <cite><a href="http://twitter.com/#{@post[:quoted_status][:user][:screen_name]}">@#{@post[:quoted_status][:user][:screen_name]}</a></cite>
              <p class="desc">#{parse_text(@post[:quoted_status][:full_text])}</p>
              <p class="read_more"></p>
            </div>
        </blockquote>
        </a>
    CODE
  end

  def quoted_status_photo
    <<-CODE
      <p class="story_img">
        <a href="#{@post[:quoted_status][:entities][:urls][0][:expanded_url]}">
          <img src="#{@post[:quoted_status][:entities][:media][0][:media_url]}:thumb">
        </a>
      </p>
    CODE
  end

  # link

  def has_link_not_fetch?
    has_link? && !is_youtube_link? && !has_quoted_status?
  end

  def to_youtube_embed(link)
    return link.gsub(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/i, 'https://www.youtube.com/embed/\1?autoplay=0&rel=0&amp;showinfo=0')
  end

  def has_link?
    defined?(@post[:entities][:urls][0][:expanded_url]) && !has_photo?
  end

  def is_youtube_link?
    @post[:entities][:urls][0][:expanded_url] =~ /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/i
  end

  def youtube_link
    <<-CODE
      <iframe class="story_img" src="#{to_youtube_embed(@post[:entities][:urls][0][:expanded_url])}" autoplay="0" frameborder="0" badge="0" portrait="0" byline="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    CODE
  end

  def link
    return youtube_link if is_youtube_link?
    <<-CODE
    CODE
  end

  # Message

  def message
    <<-CODE
      <div class="status_box">
        <p class="status">#{parse_text(@post[:full_text].truncate(180))}</p>
      </div>
    CODE
  end

  # Infos

  def user_info
    <<-CODE
      <div class="user_info row">
        <p class="profile_image col-xs-3">
            <a href="http://twitter.com/#{@post[:user][:screen_name]}"><img src="#{parse_profile_image(@post[:user][:profile_image_url])}"/></a>
        </p>
        <div class="wrap_user_name col-xs-8">
          <h1 class="user"><a href="http://twitter.com/#{@post[:user][:screen_name]}">#{@post[:user][:name]}</a></h1>
          <h2 class="username"><a href="http://twitter.com/#{@post[:user][:screen_name]}">@#{@post[:user][:screen_name]}</a></h2>
        </div>
        <p class="icon_social col-xs-1">
            <a href="http://twitter.com/#{@post[:user][:screen_name]}/status/#{@post[:id_str]}""><span class="icon-twitter"></span></a>
        </p>
      </div>
    CODE
  end

  def meta_info
    <<-CODE
      <p class="meta_info">
      <time pubdate datetime="#{created_time}">#{created_time}</time>
        <a href="https://twitter.com/intent/tweet?in_reply_to=#{@post[:id_str]}" class="icon-reply"></a>
        <a href="https://twitter.com/intent/retweet?tweet_id=#{@post[:id_str]}" class="icon-loop"></a>
        <a href="https://twitter.com/intent/favorite?tweet_id=#{@post[:id_str]}" class="icon-heart"></a>
      </p>
    CODE
  end

end
