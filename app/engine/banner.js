
const Banner = (() => {

  function buildBanner(){
    addStyleSheet();
    
    const banner_head = document.getElementById("banner");
    const banner_container = document.createElement("div");
    banner_head.classList.add("banner");
    banner_head.classList.add(
      "w-[90vw]",
      "rounded-md",
      "p-1",
      "mt-5",
      "mb-5",
      "bg-slate-800/65",
      "backdrop-blur-lg",
      "shadow-lg",
      "border",
      "border-slate-300/40",
      "dark:border-slate-600/40"
    );

    banner_container.classList.add(
      "w-full",
      "flex",
      "flex-row",
      "justify-between",
      "items-start"
    );

    banner_head.appendChild(banner_container);

    const banner_items = document.createElement("div");
    banner_items.classList.add(
      "w-full",
      "flex",
      "flex-row",
      "justify-between",
      "items-start",
      "m-4"
    );

    banner_items.appendChild(makeTitle());
    banner_items.appendChild(makeIcons());
    banner_container.appendChild(banner_items);
    banner_container.appendChild(getPortrait());

  }

  function addStyleSheet(){
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/css/banner.css";
    document.head.appendChild(link);
  }

  function getPortrait(){
    const portrait = document.createElement("img");
    portrait.src = "/static/cropped_portrait.jpg";
    portrait.alt= "handsome and professional portrait";
    portrait.width = 116;
    portrait.height = 132;
    portrait.style.borderRadius = "10px";
    return portrait;
  }

  function makeIcons(){
    const iconContainer = document.createElement("div");
    iconContainer.classList.add(
      "flex",
      "flex-col",
      "justify-end"
    )
    
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
    icon.classList.add("fa", "rounded-xl");
    icon.classList.add(icon_class);
    return icon;
  }

  function makeTitle(){
    const titleDiv = document.createElement("div");
    titleDiv.innerHTML = `
      <h1 class="text-4xl font-bold tracking-tight">Scott Thomas Andersen</h1>
      <br>
      <p>Michigan, USA</p>
      <p>sthomasen7@gmail.com</p>
    `
    return titleDiv;
  }


  return {
    "buildBanner": buildBanner
  };

}) ();

export{
  Banner
};
