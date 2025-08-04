export const layout = "layout.tsx";
export const title = "Kyle D Robinson";
export const url = "/";

export default function* ({ search }: { search: any }) {
  const allPages = search.pages();
  const posts = allPages
    .filter((page: any) => page.title && page.publish_date)
    .sort((a: any, b: any) =>
      new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()
    );

  const content = `
    <div class="header">
      <img src="/.jpg" alt="Kyle Robinson" class="avatar">
      <div class="header-content">
        <h1 class="site-title">Kyle D Robinson</h1>
        <div class="links">
          <a href="mailto:im@shimm3r.com">Email</a>
          <a href="https://github.com/kyledrobinson/">GitHub</a>
          <a href="https://x.com/Kyle_D_Robinson">Twitter</a>
          <a href="/feed">RSS</a>
        </div>
      <button class="theme-toggle" onclick="toggleTheme()">🌓</button>
      </div>
    </div>
    
    <ul class="post-list">
      ${
    posts.map((post: any) => {
      const formattedDate =
        new Date(post.publish_date).toISOString().split("T")[0];

      // Fix the URL to remove /posts/ prefix
      const cleanUrl = post.url.replace("/posts/", "/");

      return `
          <li>
            <h2><a href="${cleanUrl}">${post.title}</a></h2>
            <div class="post-date">${formattedDate}</div>
          </li>
        `;
    }).join("")
  }
    </ul>
  `;

  yield {
    url: "/",
    title: "Kyle D Robinson",
    layout: "layout.tsx",
    content: content,
  };
}
