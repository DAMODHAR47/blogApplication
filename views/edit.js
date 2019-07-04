<% include partials/header %>

<div class="ui main  text segment container">
  <div class="ui huge  header">Edit Blog</div>
  <form class="ui form " action="/blog/<%= blog._id %>?_method=PUT" method="POST">
    <div class="field">
      <label >Title</label>
      <input type="text"  name="blog[title]" value="<%= blog.title %>">
    </div>
    <div class="field">
      <label >Image url</label>
      <input type="text"  name="blog[url]" value="<%= blog.url %>">
    </div>
    <div class="field">
      <label >Description</label>
      <textarea name="blog[description]" ><%= blog.description %></textarea>
    </div>
    <button class="ui button basic purple">Submit</button>
  </form>
</div>

<% include partials/footer %>
