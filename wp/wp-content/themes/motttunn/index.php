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
    <title>motttunn.com</title>
    <meta name="description" content="web制作に関する備忘録およびポートフォリオサイトです。">
    <meta property="og:url" content="https://motttunn.com">
    <meta property="og:type" content="website">
    <meta property="og:title" content="motttunn.com">
    <meta property="og:site_name" content="motttunn.com">
    <meta property="og:description" content="web制作に関する備忘録およびポートフォリオサイトです。">
    <meta property="og:image" content="https://motttunn.com/wp/wp-content/themes/motttunn/assets/images/common/ogp.png">
    <meta property="og:locale" content="ja_JP">
    <meta property="fb:app_id" content="">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="https://motttunn.com/wp/wp-content/themes/motttunn/assets/images/common/ogp.png">
    <link rel="canonical" href="https://motttunn.com">
    <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/favicon.ico" type="image/vnd.microsoft.icon">
    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/favicon.ico" type="image/vnd.microsoft.icon">
    <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/apple-touch-icon.png">
    <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosansjapanese.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400">
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/index/lib.min.css?hash=8303415">
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/index/style.css?hash=8303415">
    <?php wp_head(); ?>
  </head>
  <body>
    <div class="st-Container">
      
      <?php get_header(); ?>
      <main class="idx-Main">
        <button class="idx-Main_Scroll sp_b" id="idx-Main_Scroll">SCROLL</button>
        <div class="idx-Main_Slider">
          <ul class="idx-Main_Slider_List" id="idx-Main_Slider_List">
            <?php
              $main_args  = array('post_type' => array('post', 'portfolio'), 'posts_per_page' => 4);
              $main_query = new WP_Query($main_args);
              if($main_query->have_posts()):
              while($main_query->have_posts()): $main_query->the_post();
              $main_item_type = get_post_type();
            ?>
            <li class="idx-Main_Slider_List_Item"><a class="Item-Anchor" href="<?php the_permalink(); ?>">
                <figure class="Item_Thumbnail"><?php the_post_thumbnail(); ?></figure>
                <div class="Item_Info">
                  <p class="Item_Info_Description">
                    <?php
                      if($main_item_type == 'post'):
                      the_time('Y.m.d.');
                      elseif ($main_item_type == 'portfolio'):
                      the_field('portfolio_date');
                      endif;
                    ?>
                     / 
                    <?php 
                      if($main_item_type == 'post'):
                      echo 'News';
                      elseif ($main_item_type == 'portfolio'):
                      echo 'Portfolio';
                      endif;
                    ?>
                  </p>
                  <p class="Item_Info_Title">
                    <?php
                      if(mb_strlen(get_the_title(), 'UTF-8')>42){
                          $main_title = mb_substr(get_the_title(), 0, 42, 'UTF-8');
                          echo $main_title . '…';
                      } else {
                          echo get_the_title();
                      }
                    ?>
                  </p>
                </div></a></li><?php
              endwhile;
              endif;
            ?>
          </ul>
        </div>
      </main>
      <section class="idx-News">
        <div class="idx-News_Box">
          <h2 class="sw-Title"><a href="<?php echo home_url(); ?>/news/">News</a></h2>
          <div class="st-Posts st-Posts-Index">
            <ul class="st-Posts_List">
              <?php
                $post_args  = array('post_type' => 'post', 'posts_per_page' => 6);
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
        </div>
      </section>
      <section class="idx-Portfolio">
        <div class="idx-Portfolio_Box">
          <h2 class="sw-Title"><a href="<?php echo home_url(); ?>/portfolio/">Portfolio</a></h2>
          <div class="st-Works st-Works-Index">
            <ul class="st-Works_List">
              <?php
                $work_count = 0;
                $work_class = 'st-Works_List_Item-Left';
                $work_args  = array('post_type' => 'portfolio', 'posts_per_page' => 3);
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
                  <div class="st-Works_List_Item_Description Item_Description">
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
        </div>
      </section>
      <section class="idx-About">
        <div class="idx-About_Box">
          <div class="idx-About_Box_Introduction">
            <h2 class="sw-Title"><span>Introduction</span></h2>
            <p class="idx-About_Box_Introduction_Text">web制作に関する備忘録およびポートフォリオサイトです。<br class="pc_i">運営している人間は粉物とビールが大好きな20歳児。<br class="pc_i">趣味は読書(辻村深月さん)とゲーム(splatoon2)。</p>
            <p class="idx-About_Box_Introduction_Text">Web上での3D表現について興味があり、<br class="pc_i">現在勉強および転職活動中です。</p>
          </div>
          <div class="idx-About_Box_Links">
            <h2 class="sw-Title"><span>Links</span></h2><a class="idx-About_Box_Links_Button" href="https://github.com/motttunn" target="_blank">GitHub</a><a class="idx-About_Box_Links_Button" href="https://twitter.com/motttunn" target="_blank">Twitter</a>
          </div>
        </div>
      </section>
      <?php get_footer(); ?>
    </div>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/index/lib.min.js?hash=8303415"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/index/app.bundle.js?hash=8303415"></script>
    <?php wp_footer(); ?>
  </body>
</html>