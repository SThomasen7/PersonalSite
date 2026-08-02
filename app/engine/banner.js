
const Banner = (() => {

  function buildBanner(){
    addStyleSheet();
    
    const banner_head = document.getElementById("banner");
    const banner_container = document.createElement("div");
    banner_head.classList.add("banner");
    banner_head.classList.add(
      "md:w-[90vw]",
      "w-[94vw]",
      "rounded-md",
      "p-1",
      "mt-5",
      "md:mb-5",
      "mb-[0px]",
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
      "justify-center",
      "md:justify-between",
      "items-center",
      "md:m-4",
      "m-1"
    );

    banner_head.appendChild(banner_container);

    const banner_items = document.createElement("div");
    banner_items.classList.add(
      "flex",
      "md:flex-row",
      "justify-center",
      "md:justify-between",
      "items-center",
      "md:gap-8",
      "md:mr-4",
      "flex-col-reverse",
      "mr-[0px]",
      "md:w-auto",
      "shrink-1"
    );

    banner_items.appendChild(makeIcons());
    banner_items.appendChild(getPortrait());
    banner_container.appendChild(makeTitle());
    banner_container.appendChild(banner_items);

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
    portrait.classList.add(
        "md:w-[116px]", "md:h-[132px]",
        "w-[35%]", "h-[40%]"
    )

    
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
      <h1 class="text-3xl md:text-5xl font-bold tracking-tight">Scott Thomas Andersen</h1>
      <p class="text-xl font-bold tracking-tight">Senior Software Engineer</p>
      <br>
      <p>sthomasen7@gmail.com</p>
    `;
    titleDiv.classList.add("flex-1", "grow-1", "w-full");
    return titleDiv;
  }


  return {
    "buildBanner": buildBanner
  };

}) ();

export{
  Banner
};
