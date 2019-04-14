
<header class="st-Header">
  <button class="st-Header_Button" id="st-Header_Button">Menu</button>
  <nav class="st-Header_Nav st-Header_Nav-Hidden" id="st-Header_Nav">
    <ul class="st-Header_Nav_List">
      <li class="st-Header_Nav_List_Item st-Header_Nav_List_Item-Close sp_b" id="st-Header_Nav_List_Item-Close">
        <button class="Item-Anchor">× Close</button>
      </li>
      <li class="st-Header_Nav_List_Item <?php if(is_home()){ echo 'st-Header_Nav_List_Item-Current'; } ?>"><a class="Item-Anchor" href="<?php echo home_url(); ?>/">Home</a></li>
      <li class="st-Header_Nav_List_Item <?php if(is_page('news') || is_singular('post')){ echo 'st-Header_Nav_List_Item-Current'; } ?>"><a class="Item-Anchor" href="<?php echo home_url(); ?>/news/">News</a></li>
      <li class="st-Header_Nav_List_Item <?php if(is_post_type_archive('portfolio') || is_singular('portfolio')){ echo 'st-Header_Nav_List_Item-Current'; } ?>"><a class="Item-Anchor" href="<?php echo home_url(); ?>/portfolio/">Portfolio</a></li>
    </ul>
  </nav>
</header>