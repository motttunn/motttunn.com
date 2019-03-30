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
    <meta property="og:image" content="">
    <meta property="og:locale" content="ja_JP">
    <meta property="fb:app_id" content="">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="">
    <link rel="canonical" href="https://motttunn.com">
    <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/favicon.ico" type="image/vnd.microsoft.icon">
    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/favicon.ico" type="image/vnd.microsoft.icon">
    <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/apple-touch-icon.png">
    <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosansjapanese.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400">
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/index/style.css?hash=7276749">
    <?php wp_head(); ?>
  </head>
  <body>
    <div class="st-Container">
      
      <?php get_header(); ?>
      <main class="idx-Main">
        <div class="idx-Main_Slider">
          <ul class="idx-Main_Slider_List">
            <li class="idx-Main_Slider_List_Item"><a class="Item-Anchor" href="#" target="_blank"><img class="Item_Thumbnail"></a></li>
          </ul>
        </div>
      </main>
      <section class="idx-News">
        <div class="idx-News_Box">
          <h2 class="sw-Title"><span>News</span></h2>
          <div class="st-Posts st-Posts-Index">
            <ul class="st-Posts_List">
              <?php
                $post_args  = array('post_type' => 'post', 'posts_per_page' => 6);
                $post_query = new WP_Query($post_args);
                if($post_query->have_posts()):
                while($post_query->have_posts()): $post_query->the_post();
              ?>
              <li class="st-Posts_List_Item"><a class="Item-Anchor" href="<?php the_permalink(); ?>">
                  <p class="Item_Date"><?php the_time('Y.m.d'); ?></p><img class="Item_Thumbnail">
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
          <h2 class="sw-Title"><span>Portfolio</span></h2>
          <div class="st-Works st-Works-Index">
            <ul class="st-Works_List">
              <li class="st-Works_List_Item st-Works_List_Item-Left"><a class="Item-Anchor" href="#">
                  <figure class="st-Works_List_Item_Thumbnail Item_Thumbnail"></figure>
                  <div class="Item_Description">
                    <div class="Item_Description_Box">
                      <h3 class="Item_Description_Box_Title">Diamond</h3>
                      <p class="Item_Description_Box_Text">WebGLを使用して、ダイヤモンドを描画。</p>
                    </div>
                  </div></a></li>
              <li class="st-Works_List_Item st-Works_List_Item-Right"><a class="Item-Anchor" href="#">
                  <figure class="st-Works_List_Item_Thumbnail Item_Thumbnail"></figure>
                  <div class="Item_Description">
                    <div class="Item_Description_Box">
                      <h3 class="Item_Description_Box_Title">Cylinder</h3>
                      <p class="Item_Description_Box_Text">WebGLを使用して、円柱を描画。</p>
                    </div>
                  </div></a></li>
            </ul>
          </div>
        </div>
      </section>
      <section class="idx-About">
        <div class="idx-About_Box">
          <div class="idx-About_Box_Introduction">
            <h2 class="sw-Title"><span>Introduction</span></h2>
            <p class="idx-About_Box_Introduction_Text">web制作に関する備忘録およびポートフォリオサイトです。<br class="pc_i">運営している人間は粉物とビールが大好きな20歳児。<br class="pc_i">趣味は読書とゲーム(splatoon2)。</p>
            <p class="idx-About_Box_Introduction_Text">抽象的ではありますが、<br class="pc_i">もっとクリエイティブなweb制作を仕事にしたいという気持ちがあり、<br class="pc_i">現在転職活動中です。</p>
          </div>
          <div class="idx-About_Box_Links">
            <h2 class="sw-Title"><span>Links</span></h2><a class="idx-About_Box_Links_Button" href="#" target="_blank">GitHub</a><a class="idx-About_Box_Links_Button" href="#" target="_blank">Twitter</a>
          </div>
        </div>
      </section>
      <?php get_footer(); ?>
    </div>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/common.bundle.js?hash=7276749"></script>
    <?php wp_footer(); ?>
  </body>
</html>