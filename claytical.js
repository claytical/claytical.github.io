function initializeGrid() {
  $("#content").load("grid.html", function() {
    $( ".project" ).hover(
      function() {
        $(this).children('.is-image').hide();
        $(this).children('.title').show();
    },
      function() {
        $(this).children('.is-image').show();
        $(this).children('.title').hide();
    });
    
  });
}


function initializeImageGalleries() {
}
/*
function init(page) {
  $("#content").load("projects/" + page.replace('#', '') + ".html", function() {
    $(".project, #projects a, .content-link").click(
    function() {
      var projectName = $(this).attr('href');
      $('a').removeClass("is-active");
      $( "a[href='"+projectName+"']" ).addClass("is-active");
    });

  });

}

*/
var mobileMenuOpen = false;

function toggleMobileMenu() {
  if(mobileMenuOpen) {
    $("#mobile-menu").hide();
    $("#menu-toggle").html("<a href='#' onClick='toggleMobileMenu();'>Project List</a>");
  }
  else {
    $("#mobile-menu").show();
    $("#menu-toggle").html("<a href='#' onClick='toggleMobileMenu();'>x</a>");

  }
  mobileMenuOpen = !mobileMenuOpen;
}


$(function() {
  if(window.location.hash != "") {
    hideAndShow(window.location.hash);
  }
  else {
    //landing page
  }
});

//initializeImageGalleries();
function hideAndShow(section, parent = false) {
    $(".project").parent().fadeOut(100);
    $(".detail").fadeOut(100);
    $(".about").fadeOut(200);    
    if(parent) {
      $(section).parent().fadeIn(1000);
    }
    else {
      $(section).fadeIn(1000);
    }
    window.location.hash = section;
}

$(".project").click(function() {
  var proj = $(this).attr("href");
  console.log("HREF: " + proj);
  hideAndShow(proj, false);
  var slider = tns(
    {"container": proj + ' .slider', 
    "autoplay": true, 
    "autoWidth": true, 
    "speed": 400,
    "controls": false,
    "controlsPosition": "bottom",
    "nav": true,
    "navAsThumbnails": true,
    "navPosition": "bottom",
    "autoplay": false,
    "autoplayPosition": "bottom"});

});

$( "#games").click(function() {
    $(".navbar-item").removeClass("is-active");
    $(this).addClass('is-active');    
    hideAndShow(".project.games", true);
});

$( "#apps").click(function() {
    $(".navbar-item").removeClass("is-active");
    $(this).addClass('is-active');
    hideAndShow(".project.apps", true);
});

$( "#prototypes").click(function() {
    $(".navbar-item").removeClass("is-active");
    $(this).addClass('is-active');
    hideAndShow(".project.prototypes", true);
});

$("#podcasts").click(function() {
    $(".navbar-item").removeClass("is-active");
    $(this).addClass('is-active');
    hideAndShow(".project.podcasts", true);
});

$("#about").click(function() {
    $(".navbar-item").removeClass("is-active");
    $(this).addClass('is-active');
    hideAndShow(".about", false);
});