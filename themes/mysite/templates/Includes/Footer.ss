<div id="footer_wrap" class="wrap">
    <footer>
        <nav>
            <ul>
                <% loop Menu(1) %>
                    <li><a href="$Link" target="$Target" class="$LinkingMode" $NavNoFollow>$MenuTitle</a></li>
					<% if MultipleOf(5) && not Last %></ul><ul><% end_if %>
                <% end_loop %>
            </ul>
        </nav>
        <ul id="social">
            <% if $SiteConfig.FacebookURL %><li><a href="$SiteConfig.FacebookURL" id="icon_fb">Like us on Facebook</a></li><% end_if %>
			<% if $SiteConfig.TwitterURL %><li><a href="$SiteConfig.TwitterURL" id="icon_fb">Follow us on Twitter</a></li><% end_if %>
			<% if $SiteConfig.LinkedInURL %><li><a href="$SiteConfig.LinkedInURL" id="icon_fb">Connect with us on LinkedIn</a></li><% end_if %>
			<% if $SiteConfig.PinterestURL %><li><a href="$SiteConfig.PinterestURL" id="icon_fb">Follow us on Pinterest</a></li><% end_if %>
			<% if $SiteConfig.InstagramURL %><li><a href="$SiteConfig.InstagramURL" id="icon_fb">Follow us on Instagram</a></li><% end_if %>
			<% if $SiteConfig.GooglePlusURL %><li><a href="$SiteConfig.GooglePlusURL" id="icon_fb">Like us on GooglePlus</a></li><% end_if %>
			<% if $SiteConfig.BlogURL %><li><a href="$SiteConfig.BlogURL" id="icon_fb">Check out our Blog</a></li><% end_if %>
			<% if $SiteConfig.FlickrURL %><li><a href="$SiteConfig.FlickrURL" id="icon_fb">Follow us on Flickr</a></li><% end_if %>
			<% if $SiteConfig.YouTubeURL %><li><a href="$SiteConfig.YouTubeURL" id="icon_fb">Check our our YouTube Channel</a></li><% end_if %>
			<% if $SiteConfig.VimeoURL %><li><a href="$SiteConfig.VimeoURL" id="icon_fb">Check out our Vimeo Channel</a></li><% end_if %>
			<% if $SiteConfig.YelpURL %><li><a href="$SiteConfig.YelpURL" id="icon_fb">Find us on Yelp</a></li><% end_if %>
			<% if $SiteConfig.TumblrURL %><li><a href="$SiteConfig.TumblrURL" id="icon_fb">Follow us on Tumblr</a></li><% end_if %>
			<% if $SiteConfig.HouzzURL %><li><a href="$SiteConfig.HouzzURL" id="icon_fb">Find us on Houzz</a></li><% end_if %>
        </ul><!--social-->
        <p id="copyright">
            Copyright &copy; $CopyrightYear $CopyrightName<br />
            <a href="http://www.iqnection.com" target="_blank">Website Design &amp; Website Hosting by IQnection</a>
        </p>
    </footer>
</div><!--footer_wrap-->