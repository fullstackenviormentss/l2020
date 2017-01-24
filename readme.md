# JOJ2020 Website

This is a static website generated with Jekyll, feeded with Contentful and hosted on Netlify. This configuration allows to have the benefits of a fast and secure static website with the flexibility of a content management system (CMS).

**Table of Contents**

- [Workflow](#examples)
- [Configuration](#)
  - [Local configuration](#local-configuration)
  - [Production configuration](#production-configuration)

## Workflow
The website is coded with Jekyll and the source code (as you should know :-) is available on Github. We choosed to deploy the website on Netlify because it offers some modern features like CDN network, continuous deployment, Git integration and inbound webhooks... Netlify also offers a free plan for Open Source project. Contentful is our API-driven CMS with which we can manage a content independently from the platform where it will be displayed. 

With the Git integration of Netlify, every time a new commit is done, the website is rebuild and redployed.

With the inbound webhooks of Netlify, every time a content is add, updated or deleted, the website is rebuild and redployed.

## Configuration
First you should check the [Social Wall documentation](https://github.com/MediaComem/jekyll-brand-social-wall) to install properly this plugin which displays the social content on the home page.

## Local configuration
This website works with `Jekyll 3.3.1` so check [the official documentation](https://jekyllrb.com/docs/home/) to be sure that you have your environment ready to run it. To retrieve the data from Contentful, you need to configure your `bash_profile` with the environment variables `CONTENTFUL_ACCESS_TOKEN` and `CONTENTFUL_SPACE_ID`. Then if you run the command `jekyll contentful` all the data will be imported from the Contentful API and printed in their respective files in the `_data/contentful` folder. Check the [Jekyll-Contentful-Data-Import doc](https://github.com/contentful/jekyll-contentful-data-import) for more informations about the Contentful data import configuration.

## Production configuration
On Netlify you just need to link the Github url with the website. Then set the Branch to deploy as you want. The _Build Cmd_ must be `jekyll contentful --rebuild` and the _Public folder_ `_site/`. Do not forget to set the environment variables for the Social Wall plugin and Contenful. Now every time you commit on your project, a new build command is executed and your website is deployed.

To rebuild your website every time a content is add, updated or removed from Contentful, you need to configure a build hooks on Netlify and copy paste its URL to Contentful webhooks settings. In this way every time you save a change on Contenful, that URL is called and the build command is run on Netlify.