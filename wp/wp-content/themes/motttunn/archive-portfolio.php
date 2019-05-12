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
    <title>Portfolio | motttunn.com</title>
    <meta name="description" content="web制作に関する備忘録およびポートフォリオサイトです。">
    <meta property="og:url" content="https://motttunn.com/portfolio/">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Portfolio | motttunn.com">
    <meta property="og:site_name" content="Portfolio | motttunn.com">
    <meta property="og:description" content="web制作に関する備忘録およびポートフォリオサイトです。">
    <meta property="og:image" content="https://motttunn.com/wp/wp-content/themes/motttunn/assets/images/common/ogp.png">
    <meta property="og:locale" content="ja_JP">
    <meta property="fb:app_id" content="">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="https://motttunn.com/wp/wp-content/themes/motttunn/assets/images/common/ogp.png">
    <link rel="canonical" href="https://motttunn.com/portfolio/">
    <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/favicon.ico" type="image/vnd.microsoft.icon">
    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/favicon.ico" type="image/vnd.microsoft.icon">
    <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/apple-touch-icon.png">
    <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosansjapanese.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400">
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/portfolio/style.css?hash=4044896">
    <?php wp_head(); ?>
  </head>
  <body>
    <div class="st-Container">
      
      <?php get_header(); ?>
      <section class="por-Archive">
        <div class="por-Archive_Box">
          <h2 class="sw-Title"><a href="<?php echo home_url(); ?>/portfolio/">Portfolio</a></h2>
          <div class="st-Works st-Works-Portfolio">
            <ul class="st-Works_List">
              <?php
                $work_count = 0;
                $work_class = 'st-Works_List_Item-Left';
                $work_paged = get_query_var('paged', 1);
                $work_args  = array('paged' => $work_paged, 'post_type' => 'portfolio', 'posts_per_page' => 9);
                $work_query = new WP_Query($work_args);
                if($work_query->have_posts()):
                while($work_query->have_posts()): $work_query->the_post();
                if($work_count%2 !== 0):
                $work_class = 'st-Works_List_Item-Right';
                else:
                $work_class = 'st-Works_List_Item-Left';
                endif;
                $work_count++;
              ?>
              <li class="st-Works_List_Item <?php echo $work_class; ?>"><a class="Item-Anchor" href="<?php the_permalink(); ?>">
                  <figure class="st-Works_List_Item_Thumbnail Item_Thumbnail"><?php the_post_thumbnail(); ?></figure>
                  <div class="Item_Description">
                    <div class="Item_Description_Box">
                      <h3 class="Item_Description_Box_Title">
                        <?php
                          if(mb_strlen(get_the_title(), 'UTF-8')>24){
                              $work_title = mb_substr(get_the_title(), 0, 24, 'UTF-8');
                              echo $work_title . '…';
                          } else {
                              echo get_the_title();
                          }
                        ?>
                      </h3>
                      <p class="Item_Description_Box_Text">
                        <?php
                          $work_content = strip_tags(get_the_content());
                          if(mb_strlen($work_content, 'UTF-8')>80){
                              $work_content_adjust = mb_substr($work_content, 0, 80, 'UTF-8');
                              echo strip_tags($work_content_adjust) . '…';
                          } else {
                              echo strip_tags(get_the_content());
                          }
                        ?>
                      </p>
                    </div>
                  </div></a></li><?php
                endwhile;
                endif;
              ?>
            </ul>
          </div>
          <div class="st-Pagenation st-Pagenation-Portfolio">
            <?php
              wp_pagenavi(array('query' => $work_query));
              wp_reset_postdata();
            ?>
          </div>
        </div>
      </section>
      <?php get_footer(); ?>
    </div>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/lib.min.js?hash=4044896"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/portfolio/app.bundle.js?hash=4044896"></script>
    <?php wp_footer(); ?>
  </body>
</html>