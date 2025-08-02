export const url = "/feed";

export default function ({ search }: { search: any }) {
  // Generate RSS content for /feed to match original tinyclouds.org
  const posts = search.pages()
    .filter((page: any) => page.title && page.publish_date)
    .sort((a: any, b: any) =>
      new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()
    );

  const rssItems = posts.map((post: any) => {
    const url = `https://tinyclouds${post.url}`;
    const date = new Date(post.publish_date).toUTCString();

    return `    <item>
      <title>${post.title}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${date}</pubDate>
    </item>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Kyle D Robinson</title>
    <description>Personal blog of Kyle D Robinson</description>
    <link>https://tinyblog.kyledrobinson.deno.net/</link>
    <language>en</language>
    <generator>Lume v3.0.5</generator>
${rssItems}
  </channel>
</rss>`;
}
