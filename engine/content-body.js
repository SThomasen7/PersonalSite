
const Contents = (() => {

  // Vars
  const nav_div = document.getElementById("navigation-bar");
  const content_div = document.getElementById("content-body");

  // Functions
  function buildContents(){

    // Build the navigation button 
    nav_div.classList = "";
    nav_div.classList.add("flex", "flex-row", "mb-xl", "mt-xl");

    let first_button = makeNavigationButton("Home", serveLanding, true);
    let last_button = makeNavigationButton("Projects", serveProjects);
    first_button.classList.add("rounded-l-lg");
    last_button.classList.add("rounded-r-lg");

    nav_div.appendChild(first_button);
    nav_div.appendChild(makeNavigationButton("Contact", serveContact));
    nav_div.appendChild(makeNavigationButton("Publications", servePublications));
    nav_div.appendChild(makeNavigationButton("Resume"));
    nav_div.appendChild(last_button);

    // Build the primary content region
    content_div.classList.add(
      "w-[90vw]",                 "h-[72vh]",
      "rounded-md",               "p-1",
      "mt-5",                     "mb-5",
      "border-slate-600/40",      "bg-slate-800/65",
      "backdrop-blur-lg",         "shadow-lg",
      "border",                   "overflow-y-auto",
      "flex",                     "flex-col"
    );

    // serve the landing content
    serveLanding();

  }

  function serveLanding() {
    // Clear the content and add for this page
    content_div.innerHTML = "";
    const content_container = document.createElement("div");
    content_container.classList.add("flex", "flex-col", "items-center");
    content_div.appendChild(content_container);
    
    content_container.appendChild(sectionDelimiter("Experience"));
    let box_oracle_1 = getBox("Oracle -- Senior Member of the Technical Staff",
                                "June 2023 - Present",
` <br>
  - Developed and maintained various automation tools to detect changes that
    cause code regressions, file bugs, and reduce developer workload. <br>
  - Proposed and developed a validation tool to confirm another tool's result,
    automating a painful part of the testing process and saving to date 600+ hours
    of manual labor from 2000+ validation job submissions. <br>
  - Designed a framework to detect anomalies in data processed by automation
    tools, which is now running for three separate tools and has reported over 1100
    anomalies that warranted manual intervention which would have gone missed. <br>
  - Collaborated in the design and development of an internal AI platform to make
    LLM usage accessible, and facilitate the creation of AI agents and workflows,
    which hosts 22 apps, with 16 more in development from a diverse set of teams. <br>
`);
    content_container.appendChild(box_oracle_1);

    let box_oracle_2 = getBox("Oracle -- Intern",
                                "August 2022 - June 2023",
` <br>
  - Designed and implemented a test framework for JDBC library with Oracle
    Cloud databases, effectively doubling existing testing capacity. <br>
  - Developed testing tool that manipulates connections between a program and a
    database to make erroneous behavior reproducible to test driver’s behavior in
    disaster scenarios. <br>
`);
    content_container.appendChild(box_oracle_2);
    
    let box_leg = getBox("Language Engineering Group (UNAM) -- Research Assistant (part time)",
                                "June 2022 - Dec. 2024",
` <br>
  - Collaborated on the development of natural language hate-speech datasets,
    scraping data, performing statistical analysis, and performing benchmarking
    tasks with LLMs. <br>
  - Designed and developed an online annotation tool for research assistants to
    annotate data, yielding a human annotated dataset that safely handled sensitive
    personal information, all while rigorously curating the annotation process for
    the validity and integrity of the surveyed data. <br>
`);
    content_container.appendChild(box_leg);

    let box_umich = getBox("University of Michigan - Research Assistant (part time)",
                                "Aug. 2019 - Aug. 2021",
` <br>
  - Utilized cloud computing resources to fine-tune neural networks such as
  BiLSTMs and YOLOV4 for various scientific projects. <br>
  - Managed a survey to measure code comprehension of assembly code
  supplemented with code comments from the original source code <br>
`);

    content_container.appendChild(box_umich);

    // Education --------------------------------------------------------------
    content_container.appendChild(sectionDelimiter("Education"));
    let box_edu_unam = getBox("Master of Science in Computer Science and Engineering",
                                "May 2024",
` <br>
National Autonomous University of Mexico (UNAM) - GPA: 9.64/10.00 <br>
Focus area: Signals, Images, and Virtual Environments
`);
    content_container.appendChild(box_edu_unam);

    let box_edu_ill = getBox("Weather and Climate Risk and Data Analytics Graduate Certificate",
                                  "Dec. 2025",
` <br>
University of Illinois Urbana-Champaign - GPA: 3.89/4.00
`);
    content_container.appendChild(box_edu_ill);

    let box_edu_umich = getBox("Bachelor of Science in Computer Science",
                                  "May 2021",
` <br>
University of Michigan Ann Arbor - GPA: 3.4/4.0
`);
    content_container.appendChild(box_edu_umich);

    content_container.appendChild(sectionDelimiter("Skills"));
  }

  function sectionDelimiter(title){
    const div = document.createElement("div");
    div.classList.add("text-4xl", "font-bold", "tracking-tight", 
                      "flex", "flex-col", "items-center", "mt-10", "mb-6");
    div.innerText = "--- "+title+" ---";
    return div;
  }

  function getBox(header, note, content){
    const div = document.createElement("div");
    div.classList.add("w-[95%]", "rounded-md", "bg-slate-800", 
        "m-[10px]", "min-h-[100px]", "border-slate-500/40",
        "shadow-lg", "border", "p-[20px]");

    if(header){
      const title_div = document.createElement("div");
      title_div.classList.add("flex", "flex-row", "justify-between");
      title_div.innerHTML = `
        <p class="font-bold text-2xl">${header}</p>
        <p class="italic text-lg">${note}</p>
      `;
      div.appendChild(title_div);
    }

    if(content){
      div.innerHTML += content;
    }

    return div;
  }

  function serveContact(){
    content_div.innerHTML = "";

  }

  function servePublications(){
    content_div.innerHTML = "";

  }

  function serveProjects(){
    content_div.innerHTML = "";

  }

  function makeNavigationButton(name, callback=null, make_active=false){
    const button = document.createElement("button");
    button.id = "nav-button-"+name;

    function make_button_active(button){
      button.classList.remove("bg-zinc-950"); 
      //button.classList.remove("text-slate-200"); 
      button.classList.add("bg-slate-700"); 
      //button.classList.add("text-amber-200"); 
    }

    function make_button_inactive(button){
      button.classList.add("bg-zinc-950"); 
      //button.classList.add("text-slate-300"); 
      button.classList.remove("bg-slate-700"); 
      //button.classList.remove("text-amber-500"); 
    }
    
    button.classList.add(
      "inline-block",         "cursor-pointer",
      "item-center",          "justify-center",
                              "border",
      "border-zinc-600",      "bg-zinc-950",
      "px-3",                 "py-2",
      "font-medium",          "text-slate-200",
      "shadow-md",            "transition-all",
      "duration-300",         "hover:-translate-y-0.5",
      "hover:shadow-xl",      "text-base",
      "active:bg-zinc-950",   "active:border-zinc-950"
    )
    button.textContent = name;

    if(make_active){
      make_button_active(button);
    }
    
    if(name == "Resume"){
      button.addEventListener("click", () => {
        window.open("/static/Resume_ScottThomasAndersen2026.pdf", "_blank");
      });
      return button;
    }

    // Event listener to display content and change the button style
    button.addEventListener("click", ((e) => {
      const buttons = nav_div.querySelectorAll("button");
      buttons.forEach(obutton => {
        make_button_inactive(obutton);
      });
      make_button_active(button);

      // serve the region contents to the contents div
      if(callback !== null){
        console.log("Calling callback");
        callback();
      }
    }));

    return button;
  }


  return {
    "buildContents": buildContents,
  };

}) ();

export{
  Contents
};
