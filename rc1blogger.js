function showrecentcomments(json) {
  for (var i = 0; i < a_rc; i++) {
    var entry = json.feed.entry[i];
    var commentLink = entry.link.find(link => link.rel == 'alternate').href;
    commentLink = commentLink.replace("#", "#comment-");
    var postLink = commentLink.split("#")[0];
    var postTitleElement = entry.content.$t.match(/<span\s+class="post-title">(.*?)<\/span>/);
    var postTitle = postTitleElement ? postTitleElement[1] : '';
    var commentContent = entry.content ? entry.content.$t : entry.summary ? entry.summary.$t : "";
    commentContent = commentContent.replace(/<\S[^>]*>/g, "");
    document.write('<div class="rcw-comments">');
    document.write(`<a href="${commentLink}">${entry.author[0].name.$t}</a> vừa bình luận`);
    if (n_rc) document.write(` tại <a href="${postLink}">${postTitle}</a>`);
    if (o_rc > 0) {
      document.write(": ");
      if (commentContent.length < o_rc) {
        document.write(`<i>${commentContent}</i>`);
      } else {
        var trimmedContent = commentContent.substring(0, o_rc);
        var lastSpace = trimmedContent.lastIndexOf(" ");
        trimmedContent = trimmedContent.substring(0, lastSpace);
        document.write(`<i>${trimmedContent}&hellip;</i>`);
      }
    }
    document.write("</div>");
  }
}
