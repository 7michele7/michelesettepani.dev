/* Michele Settepani — personal site.
   Small progressive enhancements only: theme toggle, year, recent photographs. */
(function () {
  var KEY = "pb-theme";
  var STORIES_URL = "https://photo.michelesettepani.dev/stories.json";

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var meta = document.getElementById("theme-color");
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0f0f10" : "#fcfbf9");
  }

  function save(theme) {
    try {
      localStorage.setItem(KEY, theme);
    } catch (e) {
      /* storage can be unavailable */
    }
    // Cookie is scoped to the whole domain so photo.michelesettepani.dev follows.
    document.cookie =
      KEY + "=" + theme + "; domain=.michelesettepani.dev; path=/; max-age=31536000; samesite=lax";
  }

  function card(story) {
    var a = document.createElement("a");
    a.className = "cover";
    a.href = story.url;

    var frame = document.createElement("figure");
    frame.className = "cover__frame";
    if (story.cover) {
      var img = document.createElement("img");
      img.src = story.cover;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      frame.appendChild(img);
    }

    var body = document.createElement("div");
    body.className = "cover__body";
    var title = document.createElement("h3");
    title.textContent = story.title || "";
    body.appendChild(title);
    if (story.dateLabel) {
      var time = document.createElement("time");
      time.textContent = story.dateLabel;
      body.appendChild(time);
    }

    a.appendChild(frame);
    a.appendChild(body);
    return a;
  }

  function loadStories() {
    var section = document.getElementById("recent");
    var grid = document.getElementById("recent-grid");
    if (!section || !grid) return;

    fetch(STORIES_URL, { mode: "cors" })
      .then(function (res) {
        if (!res.ok) throw new Error("stories: " + res.status);
        return res.json();
      })
      .then(function (data) {
        var stories = (data && data.stories) || [];
        if (!stories.length) return;
        stories.slice(0, 3).forEach(function (story) {
          grid.appendChild(card(story));
        });
        section.hidden = false;
      })
      .catch(function () {
        // Leave the section hidden; the Photographs link still works.
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme");
    if (btn) {
      btn.addEventListener("click", function () {
        var next = currentTheme() === "dark" ? "light" : "dark";
        apply(next);
        save(next);
      });
    }

    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    loadStories();
  });
})();
