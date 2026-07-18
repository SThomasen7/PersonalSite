
const Banner = (() => {

  function buildBanner(){
    addStyleSheet();
    
    const banner_head = document.getElementById("banner");
    const banner_container = document.createElement("div");
    banner_head.classList.add("banner");
    banner_container.style.width = "100%";
    banner_container.style.display = "flex";
    banner_container.style.flexDirection = "row";
    banner_container.style.justifyContent = "space-between";
    banner_head.appendChild(banner_container);


    banner_container.appendChild(makeIcons());
    banner_container.appendChild(getPortrait());

  }

  function addStyleSheet(){
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../css/banner.css";
    document.head.appendChild(link);
  }

  function getPortrait(){
    const portrait = document.createElement("img");
    portrait.src = "/static/Portrait.jpg";
    portrait.alt= "handsome and professional portrait";
    portrait.width = 145;
    portrait.height = 165;
    portrait.style.borderRadius = "10px";
    return portrait;
  }

  function makeIcons(){
    const iconContainer = document.createElement("div");
    iconContainer.style.margin = "15px 20px 0px 0px";
    
    iconContainer.appendChild(
      makeIcon("fa-github", "https://github.com/SThomasen7")
    );

    iconContainer.appendChild(
      makeIcon("fa-linkedin", 
                "https://www.linkedin.com/in/scott-andersen-631275173")
    );

    return iconContainer;
  }

  function makeIcon(icon_class, link){
    const icon = document.createElement("a");
    icon.href = link;
    icon.target = "_blank";
    icon.classList.add("fa");
    icon.classList.add(icon_class);
    return icon;
  }


  return {
    "buildBanner": buildBanner
  };

}) ();

export{
  Banner
};


/*
      <div style="width: 90%; diplay:flex; flex-direction:column; justify-content: space-between">
        <div style="display:flex; flex-direction:row; justify-content: space-between">

        <div style="width: 100%; display:flex; flex-direction:column; justify-content: space-between">
          <h1> Scott Thomas Andersen <br> </h1>
          <a href="mailto: Stasen@umich.edu"> sthomasen7@gmail.com </a>
        <div>

        </div>


        <div style="display:flex; flex-direction:row; align-items: flex-end">
        <div class="links"> 
        <div>
        <a href="index.html" class="links">Home</a>
        <a href="contact.html" class="links">Contact</a>
        <a href="publications.html" class="links">Publications</a>
        <a href="static/Resume_ScottThomasAndersen2026.pdf" class="links"
          target="_blank">Resume</a>
        <a href="gallery.html" class="links">Gallery</a>
        </div>
        </div>
        </div>
      </div>
      !<img src="static/Portrait.jpg" alt="Photo" width="145" height="165">
*/
