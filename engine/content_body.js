
const Contents = (() => {

  // Vars
  const nav_div = document.getElementById("navigation-bar");
  const content_div = document.getElementById("content-body");

  // Functions
  function buildContents(){

    // Build the navigation button 
    nav_div.classList = "";
    nav_div.classList.add("flex", "flex-row", "mb-xl", "mt-xl");

    let current_tab = sessionStorage.getItem("currentTab");
    serveLanding();
    sessionStorage.setItem("currentTab", current_tab);

    let first_button = makeNavigationButton("Home", serveLanding, true);
    nav_div.appendChild(first_button);
    
    let last_button = makeNavigationButton("Projects", serveProjects);
    first_button.classList.add("rounded-l-lg");
    last_button.classList.add("rounded-r-lg");

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

  }

  function serveLanding() {
    // Clear the content and add for this page
    sessionStorage.setItem('currentTab', 'home');
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

    let skills_box = document.createElement("div");
    skills_box.classList.add("grid", "grid-cols-1", "md:grid-cols-3", "gap-2");

    const createSkillsBox = ((title, skill_list) => {
      let box = document.createElement("div");
      box.classList.add("flex", "flex-col", "flex-1", "rounded-md", 
        "bg-slate-800", "m-[10px]", "min-h-[100px]", "border-slate-500/40",
        "shadow-lg", "border", "p-[20px]");


      box.innerHTML = `<h3 class="float-center">${title}</h3>`;
      skill_list.forEach((skill) => {
        box.innerHTML += `<p>${skill}</p>`;
      });

      skills_box.appendChild(box);
    });

    createSkillsBox("Programming Languages", [
      "- C/C++: Advanced",
      "- Python: Advanced",
      "- PL/SQL: Advanced",
      "- Javascript: Advanced",
      "- CUDA: Proficient",
      "- Bash: Proficient",
      "- Java: Proficient"
    ]);

    createSkillsBox("Technical Skills", [
      "- UNIX Systems: Advanced",
      "- Vi/VIM: Advanced",
      "- OpenGL/WebGL: Advanced",
      "- MatLab/Octave: Advanced",
      "- Git/GitHub: Advanced",
      "- Python ML Packages, i.e. PyTorch, SciKit Learn: Advanced",
      "- Python Data Science Packages, i.e. pandas, xarray, numpy: Advanced",
      "- Postman: Proficient",
      "- Cloud Services; Google Cloud/Oracle Cloud: Proficient",
    ]);

    createSkillsBox("Non-Technical Skills", [
      "- Excellent communicator",
      "- Native English",
      "- Certified Fluent in Spanish",
      "- Team player",
    ]);
    content_container.appendChild(skills_box);
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
    sessionStorage.setItem('currentTab', 'contact');
    content_div.innerHTML = "";

    const contact_form = document.createElement("div");
    contact_form.classList.add("w-[95%]", "rounded-md", "bg-slate-800", 
        "m-[10px]", "min-h-[100px]", "border-slate-500/40",
        "shadow-lg", "border", "p-[20px]");

    contact_form.innerHTML = `
    <form>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label for="name" class="block mb-2.5 text-base text-heading">Name</label>
            <input type="text" id="Name" class="bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="" required />
        </div>
        <div>
            <label for="email" class="block mb-2.5 text-base font-medium text-heading">Email address</label>
            <input type="email" id="email" class="bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="" required />
        </div>
    </div>
    <div class="mb-6">
      <label for="email_content" class="block mb-2.5 text-base font-medium text-heading">Message</label>
      <textarea
        id="email_content"
        rows="5"
        class="bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2"></textarea>
    </div>
    <button type="Send" class="inline-block cursor-pointer item-center justify-center rounded-lg border border-zinc-600 bg-zinc-950 px-3 py-2 font-medium text-slate-200 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl text-sm">Submit</button>
</form>
  `;
    content_div.appendChild(contact_form);

  }

  function servePublications(){
    sessionStorage.setItem('currentTab', 'publications');
    content_div.innerHTML = "";

    const content_container = document.createElement("div");
    content_container.classList.add("flex", "flex-col", "items-center");
    content_div.appendChild(content_container);

    let disclaimer = document.createElement("p");
    disclaimer.innerHTML = `
      <br> If you cite any of my work please use my full name; 
        <span class="italic">Scott Thomas Andersen</span>. <br>`;
    content_container.appendChild(disclaimer);


    let publications = [
      {
        title: "The Mexican Gayze: A Computational Analysis of the Attitudes towards the LGBT+ Population in Mexico on Social Media Across a Decade.",
        link: "https://aclanthology.org/2024.woah-1.14/",
        authors: "Scott Thomas Andersen, Sergio-Luis Ojeda-Trueba, Juan Vásquez, Gemma Bel-Enguix",
        primary: "The 8th Workshop on Online Abuse and Harms (WOAH).",
        secondary: "Association for Computational Linguistics",
        year: "2024"
      },
      {
        title: "COMCAT: Leveraging Human Judgment to Improve Automatic Documentation and Summarization",
        link: "https://arxiv.org/abs/2407.13648",
        authors: "Skyler Grandel, Scott Thomas Andersen, Yu Huang, Kevin Leach",
        primary: "arXive preprint",
        year: "2024"
      },
      {
        title: "Overview of HOMO-MEX at Iberlef 2024: Hate Speech Detection Towards the Mexican Spanish speaking LGBTQ+ population",
        link: "http://journal.sepln.org/sepln/ojs/ojs/index.php/pln/article/view/6566",
        authors: "Helena Gómez-Adorno, Gemma Bel-Enguix, Hiram Calvo, Sergio Ojeda-Trueba, Scott Thomas Andersen, Juan Vásquez, Tania Alcántara, Miguel Soto, Cesar Macias",
        primary: "Procesamiento del Lenguaje Natural, Vol 73. 2024.",
        year: "2024"
      },
      {
        title: "Overview of HOMO-MEX at Iberlef 2023: Hate speech detection in Online Messages directed tOwards the MEXican Spanish speaking LGBTQ+ population",
        link: "http://journal.sepln.org/sepln/ojs/ojs/index.php/pln/article/view/6566",
        authors: "Gemma Bel-Enguix, Helena Gómez-Adorno, Gerardo Sierra, Juan Vásquez, Scott Thomas Andersen, Sergio-Luis Ojeda-Trueba",
        primary: "Natural Language Processing, Vol 71. 2023.",
        year: "2023"
      },
      {
        title: "HOMO-MEX: A Mexican Spanish Annotated Corpus for LGBT+phobia Detection on Twitter",
        link: "https://aclanthology.org/2023.woah-1.20/",
        authors: "Juan Vásquez, Scott Thomas Andersen, Gemma Bel-Enguix, Sergio-Luis Ojeda-Trueba, Helena Gómez-Adorno",
        primary: "The 7th Workshop on Online Abuse and Harms (WOAH).",
        secondary: "Association for Computational Linguistics. 2023.",
        year: "2023"
      },
      {
        title: "HeteroCorpus: A Corpus for Heteronormative Language Detection",
        link: "https://aclanthology.org/2022.gebnlp-1.23/",
        authors: "Juan Vásquez, Gemma Bel-Enguix, Scott Thomas Andersen, and Sergio-Luis Ojeda-Trueba",
        primary: "2022. HeteroCorpus: A Corpus for Heteronormative Language Detection. ",
        secondary: "In Proceedings of the 4th Workshop on Gender Bias in Natural Language Processing (GeBNLP), <br> pages 225–234, Seattle, Washington.",
        year: "2023"
      },
    ];

    const makePublicationBox = ((pub) => {
      const div = document.createElement("div");
      div.classList.add("w-[95%]", "rounded-md", "bg-slate-800", 
          "m-[10px]", "min-h-[100px]", "border-slate-500/40",
          "shadow-lg", "border", "p-[20px]");

      const title_div = document.createElement("div");
      title_div.classList.add("flex", "flex-row", "justify-between");
      title_div.innerHTML = `
        <a href="${pub.link}" target="_blank"> 
          <p class="font-bold text-2xl hover:text-teal-700">${pub.title}</p>
        </a>
        <p class="italic text-lg">${pub.year}</p>
      `;
      div.appendChild(title_div);

      div.innerHTML += `
        <p>${pub.authors}</p>
        <p>${pub.primary}</p>
      `;

      if(pub.secondary){
        div.innerHTML += `<p>${pub.secondary}</p>`;
      }

      return div;
    });


    publications.forEach((publication) => {
      let pub_box = makePublicationBox(publication);
      content_container.appendChild(pub_box);
    });


  }

  function serveProjects(){
    sessionStorage.setItem('currentTab', 'projects');
    content_div.innerHTML = "";

    let grid = document.createElement("div");
    grid.classList.add("grid", "grid-cols-1", "md:grid-cols-2", "gap-4");

    // List of projects
    let projects = [
      {
        title: "Plant Tracking",
        link: "https://github.com/SThomasen7/PlantTracking",
        desc: `Python project to detect plants, count, and track plants
               at a fruit farm. This project has used multiple computer vision
               methods as well as YoloV26 for plant detection. <br>
               This project started with traditional computer vision methods to detect
               plants, these initial frames from videos were used along with a hand annotated
               set of images to fine tune a Yolo model for plant detection and counting.
              `,
        image: "/static/projects/plant_tracking_thumbnail.png",
        tags: [
                {tag: "Python", color: "bg-yellow-700"},
                {tag: "OpenCV", color: "bg-green-700"},
                {tag: "Computer Vision", color: "bg-sky-700"},
              ]
      },
      {
        title: "CUDA Ray Tracer",
        link: "https://github.com/SThomasen7/CudaRayTracer",
        desc: `FIXME`,
        image: "/static/projects/cuda_ray_tracer.jpg",
        tags: [
                {tag: "C++", color: "bg-yellow-700"},
                {tag: "Cuda", color: "bg-green-700"},
                {tag: "Computer Graphics", color: "bg-sky-700"},
              ]
      },
    ]

    // Create the cell element
    const createProjectCell = ((project) => {

      let div = document.createElement("div");
      div.classList.add("w-[95%]", "rounded-md", "bg-slate-800", 
          "m-[10px]", "min-h-[100px]", "border-slate-500/40",
          "shadow-lg", "border", "p-[20px]");

      let image = document.createElement("img");
      image.src = project.image;
      image.alt = `photo ${project.title}`;
      image.classList.add("block", "mx-auto");

      let title = document.createElement("a");
      title.textContent = project.title;
      title.href = project.link;
      title.target = "_blank";
      title.classList.add("text-4xl", "font-bold", "tracking-tight", 
                "flex", "flex-col", "items-center", "mt-10", "mb-6",
                "hover:text-teal-700");

      let desc = document.createElement("p");
      desc.innerHTML = project.desc+"<br>";

      div.appendChild(image);
      div.appendChild(title);
      div.appendChild(desc);

      // Add the tags to the end of the image:
      let tag_container = document.createElement("div");
      tag_container.classList.add("flex", "flex-row");
      project.tags.forEach((tag) => {
        let tag_div = document.createElement("div");
        tag_div.innerHTML = tag.tag;
        tag_div.classList.add(
          "inline-block", "item-center", 
          "justify-center", "rounded-lg", "border", 
          "border-zinc-600", "px-3", "py-2", "mx-2",
          "font-medium", "text-slate-200", "shadow-md",
          "text-base", tag.color
        );
        tag_container.appendChild(tag_div);

      });
      div.appendChild(tag_container);

      grid.appendChild(div);

    });

    projects.forEach((project) => {
      createProjectCell(project);
    });

    content_div.appendChild(grid);

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

    // Set the current tab to active if it is in session storage.
    let current_tab = sessionStorage.getItem("currentTab");
    if(current_tab == name.toLowerCase() && callback != null){
      callback();
      const buttons = nav_div.querySelectorAll("button");
      buttons.forEach(obutton => {
        make_button_inactive(obutton);
      });
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
