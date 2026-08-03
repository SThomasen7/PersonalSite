
const Contents = (() => {

  // Vars
  const nav_div = document.getElementById("navigation-bar");
  const content_div = document.getElementById("content-body");

  // Functions
  function buildContents(){

    // Build the navigation button 
    nav_div.classList = "";
    nav_div.classList.add("flex", "flex-row", "my-[3px]", "md:mb-xl", "md:mt-xl");

    let current_tab = sessionStorage.getItem("currentTab");
    serveLanding();
    sessionStorage.setItem("currentTab", current_tab);

    let first_button = makeNavigationButton("Home", serveLanding, true);
    nav_div.appendChild(first_button);
    
    let last_button = makeNavigationButton("Resume");
    first_button.classList.add("rounded-l-lg");
    last_button.classList.add("rounded-r-lg");

    nav_div.appendChild(makeNavigationButton("Projects", serveProjects));
    nav_div.appendChild(makeNavigationButton("Publications", servePublications));
    nav_div.appendChild(makeNavigationButton("Contact", serveContact));
    nav_div.appendChild(last_button);

    // Build the primary content region
    content_div.classList.add(
      "md:w-[90vw]",              "h-[72vh]",
      "w-[94vw]", 		  "mt-[0px]",
      "rounded-md",               "p-1",
      "md:mt-5",                  "mb-5",
      "border-slate-600/40",      "bg-slate-800/65",
      "backdrop-blur-lg",         "shadow-lg",
      "border",                   "overflow-y-auto",
      "flex",                     "flex-col",
      "items-center",
    );

    const params = new URLSearchParams(window.location.search);
    const section = params.get("section");
 
    if(section == 'Home'){
	serveLanding();
    } else if(section == 'Projects'){
        serveProjects();
    } else if(section == 'Publications'){
        servePublications();
    } else if(section == 'Contact'){
        serveContact();
    }

    const url = new URL(window.location.href);
    url.searchParams.delete("section");
    window.history.replaceState({}, "", url);

  }

  function serveLanding() {
    // Clear the content and add for this page
    sessionStorage.setItem('currentTab', 'home');
    content_div.innerHTML = "";
    content_div.scrollTo(0, 0);
    const content_container = document.createElement("div");
    content_container.classList.add("flex", "flex-col", "items-center");
    content_div.appendChild(content_container);
    
    content_container.appendChild(sectionDelimiter("Experience"));
    let box_oracle_1 = getBox("Oracle -- Senior Member of the Technical Staff",
                                "Jun. 2023 - Present",
` <br>
  I work in Automation tools in the Database Org at Oracle. My responsibilities
  involve developing and maintaining tools to assist with the testing and triage
  process. These include tools that automate bug filing, detecting the change that
  caused regressions, and an internal platform for creating AI powered workflows.
  <br> <br>

  These tools are considered critical to the business and collectively automate
  thousands of task each day. I also manage reporting tools to monitor their
  behavior, notify developers when anomalies are detected. <br> <br>

  I've created several smaller auxiliary tools for managing tasks on our team,
  of which we've now have recorded thousands of jobs processed saving to date hundreds
  of ours of manual labor. <br>
`);
    content_container.appendChild(box_oracle_1);

    let box_oracle_2 = getBox("Oracle -- Intern",
                                "Aug. 2022 - Jun. 2023",
` <br>
  I worked on the testing team for the JDBC library that facilitates connections
  between java programs the database. I expanded our testing framework to allow
  the execution of our existing tests built for a local database to Oracle cloud
  database instances. <br> <br>

  During my internship I also created a testing framework to mock the database listener
  when executing tests and force certain failure behavior. To test how the driver manages
  faulty connections to a database instance. <br> <br>
`);
    content_container.appendChild(box_oracle_2);
    
    let box_leg = getBox("Language Engineering Group (UNAM) -- Research Assistant (part time)",
                                "Jun. 2022 - Dec. 2024",
` <br>
  This was an informal position at the Language Engineering Group at UNAM. I
  assisted in paper writing, experimental design, running data annotation experiments and more
  for NLP projects focused on hate speech detection on social media. <br> <br>

  I created a platform for data annotation, replacing an excel sheet the team was previously
  relying on, that facilitated the accurate annotation of thousands of Tweets for hate speech
  in Mexican Spanish. <br> <br>

  This effort led to my co authorship on 5 peer reviewed NLP papers,
  check them out in the Publications tab! <br> <br>
`);
    content_container.appendChild(box_leg);

    let box_umich = getBox("University of Michigan - Research Assistant (part time)",
                                "Aug. 2019 - Aug. 2021",
` <br>
  Work study position at the University of Michigan - Ann Arbor. <br> <br>

  I assisted in an experiment using YoloV4 to detect objects on the road from drive
  videos to improve spatial awareness for self driving cars. <br> <br>

  I also used google cloud instances to fine-tune BiLSTMs and Bert model for code
  summarization tasks. The data for this experiment was compiled and annotated
  on a crowd source platform. I designed the study, as well as compiled the data
  for annotation.  <br> <br>
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
        "shadow-lg", "border", "p-[20px]", "flex", "flex-col");

    if(header){
      const title_div = document.createElement("div");
      title_div.classList.add("flex", "flex-row", "justify-between");
      title_div.innerHTML = `
        <p class="font-bold text-2xl">${header}</p>
        <p class="italic text-xl">${note}</p>
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
        "m-[10px]", "border-slate-500/40",
        "shadow-lg", "border", "p-[20px]");

    contact_form.innerHTML = `
    <h3 class="text-4xl font-bold">Drop me a line!</h3>
    <p class="text-xl">Send an email or leave a note below.</p>
    <br>
    <form action="/contactme" method="post">
    <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label for="name" class="block mb-2.5 text-xl text-heading">Name</label>
            <input name="name" type="text" id="Name" class="bg-neutral-secondary-medium border border-default-medium text-heading text-xl rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="" required />
        </div>
        <div>
            <label for="email" class="block mb-2.5 text-xl font-medium text-heading">Email address</label>
            <input name="email" type="email" id="email" class="bg-neutral-secondary-medium border border-default-medium text-heading text-xl rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="" required />
        </div>
    </div>
    <div class="mb-6">
      <label for="email_content" class="block mb-2.5 text-xl font-medium text-heading">Message</label>
      <textarea
        id="email_content"
        rows="5"
	name="message"
        class="bg-neutral-secondary-medium border border-default-medium text-heading text-xl rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2"></textarea>
    </div>
    <button type="Send" class="inline-block cursor-pointer item-center justify-center rounded-lg border border-zinc-600 bg-zinc-950 px-3 py-2 font-medium text-slate-200 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl text-xl">Submit</button>
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
        year: "2022"
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

    const content_container = document.createElement("div");
    content_container.classList.add("flex", "flex-col", "items-center");

    content_container.classList.add("w-[95%]", "rounded-md", "bg-slate-800", 
        "m-[10px]", "border-slate-500/40",
        "shadow-lg", "border", "p-[15px]");

    let disclaimer = document.createElement("div");
    content_container.classList.add("flex");
    content_container.innerHTML = `
      <h3 class="text-3xl font-bold mb-3"> A note on AI Usage </h3>
      <p class="w-full break-words">
      Although I think AI and Agentic AI Coding tools have an important role in modern
      programming, the purpose of this website is to showcase my abilities, not those
      of an LLM.
      Therefore I pledge that the projects below were created by me, any AI used was as
      a search tool for documentation or understanding an error, the code in these projects
      was proudly human generated.
      </p>
    `;
    content_div.appendChild(content_container);

    let grid = document.createElement("div");
    grid.classList.add("grid", "grid-cols-1", "md:grid-cols-2", "gap-4", "w-[95%]");

    // List of projects
    let projects = [
      {
        title: "Plant Tracking",
        link: "https://github.com/SThomasen7/PlantTracking",
        desc: `
        This project was in assistance to a friend who worked at a berry farm.
        They were looking for a tool to help them automatically count the number of plants
        to track their growth over time. 
        <br>
        This project was developed in Python and uses OpenCV as well as YOLOv26 for
        detection and tracking of strawberry sprouts. First, traditional methods
        were used to segment and group leaves as individual plants. This was then
        used to fine tune YOLOv26 to improve automatic plant classification.
        <br> <br>
        `,
        image: "/static/projects/plant_tracking_thumbnail.png",
        tags: [
                {tag: "Python", color: "bg-yellow-700"},
                {tag: "Machine Learning", color: "bg-green-700"},
                {tag: "Deep Learning", color: "bg-green-700"},
                {tag: "OpenCV", color: "bg-green-700"},
                {tag: "Computer Vision", color: "bg-sky-700"},
              ]
      },
      {
        title: "CUDA Ray Tracer",
        link: "https://github.com/SThomasen7/CudaRayTracer",
        desc: `
        This is just one of many RayTracers that I have developed as a hobby project.
        What I am particularly proud of this one is that it is developed using CUDA to
        significantly speed up the rendering process. 
        <br>
        This was developed in C++ and uses CUDA to parallelize the per pixel ray casting
        and object collision testing. 
        <br> <br>
        `,
        image: "/static/projects/cuda_ray_tracer.jpg",
        tags: [
                {tag: "C++", color: "bg-yellow-700"},
                {tag: "Cuda", color: "bg-green-700"},
                {tag: "Computer Graphics", color: "bg-sky-700"},
              ]
      },
      {
        title: "Blizzard Detection",
        link: "https://github.com/SThomasen7/BlizzardDetection/tree/main",
        desc: `
        This project was the final project for a data science course during
        my graduate certificate in Climate and Weather Risk and Data Analytics.
        <br>

        In most climate literature, future projections of climate change impact on snowstorms
        do not use the actual NWS definition of a blizzard. That's because this definition
        classifies a blizzard based on the visibility from falling or blowing snow. i.e., it does
        not necessarily need to be snowing for a blizzard to be present. This creates
        a disparity between weather forecasting and climate projections for these types
        of winter storms.
        <br>

        Most literature classifies winter storms based on snowfall or a composite of snowfall
        and wind speed. This project demonstrates that considering other factors that
        suggest how much snow can be transported by wind, such as snow layer temperature and
        snow density, leads to much more accurate detection of blizzards.
        <br>

        A dataset of blizzard events was created by combining NCEI's Storm Event dataset
        and ERA5 girded climate reanalysis data, and detection was done with various algorithms
        using wind speed and snowfall, as well as snow density and snow surface temperature.
        Demonstrating that taking these variables into account improved substantially classification.
        <br> <br>

        `,
        image: "/static/projects/blizzard_detection.png",
        tags: [
                {tag: "Python", color: "bg-yellow-700"},
                {tag: "Machine Learning", color: "bg-green-700"},
                {tag: "GeoSpatial Computing", color: "bg-sky-700"},
                {tag: "Data Science", color: "bg-sky-700"},
              ]
      },
      {
        title: "Tweet Annotation Platform",
        link: "https://github.com/SThomasen7/EncuestaHomoMex",
        desc: `
        This project was for the Language Engineering Group at UNAM, we were attempting to compile
        a dataset of Tweets that contained LGBT+-phobic speech in Mexican Spanish. We compiled
        the tweets but needed annotators to label the data appropriately. 

        <br>

        This site was created so they could easily see the post text rendered as a tweet and select
        the relevant labels, gay-phobic, lesbo-phobic, etc. Prior to this a simple excel spreadsheet
        was being used, which made annotation difficult, cumbersome, and more error prone.

        <br>

        The compiled dataset led to several publications under the HomoMex project, available in the
        publications tab of this website.

        <br> <br>
        `,
        image: "/static/projects/encuesta_homo_mex.png",
        tags: [
                {tag: "Python", color: "bg-yellow-700"},
                {tag: "Flask", color: "bg-green-700"},
                {tag: "NginX", color: "bg-green-700"},
                {tag: "Full Stack Development", color: "bg-sky-700"},
                {tag: "Social Computing", color: "bg-sky-700"},
              ]
      },
    ]

    // Create the cell element
    const createProjectCell = ((project) => {

      let div = document.createElement("div");
      div.classList.add("w-full", "rounded-md", "bg-slate-800", 
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
      tag_container.classList.add("flex", "flex-row", "flex-wrap");
      project.tags.forEach((tag) => {
        let tag_div = document.createElement("div");
        tag_div.innerHTML = tag.tag;
        tag_div.classList.add(
          "rounded-lg", "border", 
          "border-zinc-600", "px-3", "py-2",
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

    const params = new URLSearchParams(window.location.search);
    const section = params.get("section");
    if(section == name){
	make_active = true;
    } else if (section != null){
        make_active = false;
    }

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
      "md:px-3", "px-1",      "md:py-2",
      "font-medium",          "text-slate-200",
      "shadow-md",            "transition-all",
      "duration-300",         "hover:-translate-y-0.5",
      "hover:shadow-xl",      "md:text-md",
      "active:bg-zinc-950",   "active:border-zinc-950",
      "text-base",            "w-full"
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
