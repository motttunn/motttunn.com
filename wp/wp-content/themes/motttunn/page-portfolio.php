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
    <meta property="og:image" content="">
    <meta property="og:locale" content="ja_JP">
    <meta property="fb:app_id" content="">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="">
    <link rel="canonical" href="https://motttunn.com/portfolio/">
    <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/favicon.ico" type="image/vnd.microsoft.icon">
    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/favicon.ico" type="image/vnd.microsoft.icon">
    <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/apple-touch-icon.png">
    <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosansjapanese.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400">
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/portfolio/style.css?hash=1808687">
    <?php wp_head(); ?>
  </head>
  <body>
    <div class="st-Container">
      
      <?php get_header(); ?>
      <section class="por-Archive">
        <div class="por-Archive_Box">
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
      <?php get_footer(); ?>
    </div>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/portfolio/app.bundle.js?hash=1808687"></script>
    <?php wp_footer(); ?>
  </body>
</html>