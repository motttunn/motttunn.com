<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <script>
      if (navigator.userAgent.indexOf('iPad') > 0)
      { document.write('<meta name="viewport" content="width=1024, maximum-scale=2, user-scalable=yes">'); }
      else
      { document.write('<meta name="viewport" content="width=device-width, initial-scale=1,minimum-scale=1, maximum-scale=2, user-scalable=yes">'); }
    </script>
    <title>News | motttunn.com</title>
    <meta name="description" content="web制作に関する備忘録およびポートフォリオサイトです。">
    <meta property="og:url" content="https://motttunn.com/news/">
    <meta property="og:type" content="website">
    <meta property="og:title" content="News | motttunn.com">
    <meta property="og:site_name" content="News | motttunn.com">
    <meta property="og:description" content="web制作に関する備忘録およびポートフォリオサイトです。">
    <meta property="og:image" content="https://motttunn.com/wp/wp-content/themes/motttunn/assets/images/common/ogp.png">
    <meta property="og:locale" content="ja_JP">
    <meta property="fb:app_id" content="">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="https://motttunn.com/wp/wp-content/themes/motttunn/assets/images/common/ogp.png">
    <link rel="canonical" href="https://motttunn.com/news/">
    <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/favicon.ico" type="image/vnd.microsoft.icon">
    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/favicon.ico" type="image/vnd.microsoft.icon">
    <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/apple-touch-icon.png">
    <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosansjapanese.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400">
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/news/style.css?hash=4454520">
    <?php wp_head(); ?>
  </head>
  <body>
    <div class="st-Container">
      
      <?php get_header(); ?>
      <section class="new-Archive">
        <div class="new-Archive_Box">
          <h2 class="sw-Title"><a href="<?php echo home_url(); ?>/news/">News</a></h2>
          <div class="st-Posts st-Posts-News">
            <ul class="st-Posts_List">
              <?php
                $post_paged = get_query_var('paged', 1);
                $post_args  = array('paged' => $post_paged, 'post_type' => 'post', 'posts_per_page' => 12);
                $post_query = new WP_Query($post_args);
                if($post_query->have_posts()):
                while($post_query->have_posts()): $post_query->the_post();
              ?>
              <li class="st-Posts_List_Item"><a class="Item-Anchor" href="<?php the_permalink(); ?>">
                  <p class="Item_Date"><?php the_time('Y.m.d.'); ?></p>
                  <figure class="Item_Thumbnail"><?php the_post_thumbnail(); ?></figure>
                  <h3 class="Item_Title">
                    <?php
                      if(mb_strlen(get_the_title(), 'UTF-8')>42){
                          $post_title = mb_substr(get_the_title(), 0, 42, 'UTF-8');
                          echo $post_title . '…';
                      } else {
                          echo get_the_title();
                      }
                    ?>
                  </h3></a></li><?php
                endwhile;
                endif;
              ?>
            </ul>
          </div>
          <div class="st-Pagenation st-Pagenation-News">
            <?php
              wp_pagenavi(array('query' => $post_query));
            ?>
          </div>
        </div>
      </section>
      <?php get_footer(); ?>
    </div>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/lib.min.js?hash=4454520"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/news/app.bundle.js?hash=4454520"></script>
    <?php wp_footer(); ?>
  </body>
</html>