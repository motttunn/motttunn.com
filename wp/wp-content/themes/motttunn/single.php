
<?php
  if(have_posts()):
  while(have_posts()): the_post();
  $post_meta_desc      = esc_html(get_the_excerpt());
  $post_meta_thumb_id  = get_post_thumbnail_id();
  $post_meta_thumb_url = wp_get_attachment_image_src($post_meta_thumb_id, true);
  $post_meta_thumb_url = esc_url($post_meta_thumb_url[0]);
  endwhile;
  endif;
?>
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
    <title><?php the_title(); ?> | News | motttunn.com</title>
    <meta name="description" content="<?php echo $post_meta_desc; ?>">
    <meta property="og:url" content="https://motttunn.com/news/">
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?php the_title(); ?> | News | motttunn.com">
    <meta property="og:site_name" content="<?php the_title(); ?> | News | motttunn.com">
    <meta property="og:description" content="<?php echo $post_meta_desc; ?>">
    <meta property="og:image" content="">
    <meta property="og:locale" content="ja_JP">
    <meta property="fb:app_id" content="">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="">
    <link rel="canonical" href="https://motttunn.com/news/">
    <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/favicon.ico" type="image/vnd.microsoft.icon">
    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/favicon.ico" type="image/vnd.microsoft.icon">
    <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/apple-touch-icon.png">
    <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosansjapanese.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400">
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/news/style.css?hash=8060704">
    <?php wp_head(); ?>
  </head>
  <body>
    <div class="st-Container">
      
      <?php get_header(); ?>
      <section class="st-Detail">
        <div class="st-Detail_Box">
          <h2 class="sw-Title"><a href="<?php echo home_url(); ?>/news/">News</a></h2>
          <div class="st-Detail_Box_Content">
            <h3 class="Content_Title"><?php the_title(); ?></h3>
            <p class="Content_Date"><?php the_time('Y.m.d.'); ?></p>
            <figure class="Content_Thumbnail"><?php the_post_thumbnail(); ?></figure>
            <div class="Content_Text"><?php the_content(); ?></div>
            <div class="Content_PrevNext">
              <?php
                $item_current = get_the_permalink();
                $item_prev    = get_permalink(get_adjacent_post(false, '', true));
                $item_next    = get_permalink(get_adjacent_post(false, '', false));
                if($item_prev !== $item_current):
              ?><a class="Content_PrevNext_Prev" href="<?php echo $item_prev; ?>"><<　Prev</a><?php endif; if($item_next !== $item_current): ?><a class="Content_PrevNext_Next" href="<?php echo $item_next; ?>">Next　>></a><?php endif; ?>
            </div>
          </div>
        </div>
      </section>
      <?php get_footer(); ?>
    </div>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/lib.min.js?hash=8060704"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/news/app.bundle.js?hash=8060704"></script>
    <?php wp_footer(); ?>
  </body>
</html>