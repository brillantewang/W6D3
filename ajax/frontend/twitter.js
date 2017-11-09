const FollowToggle = require('./follow_toggle.js');

$(() => {
  const $buttons = $('.follow-toggle');
  $buttons.each((idx, el) => {
    // console.log(el);
    let $button = $(el);
    new FollowToggle($button);
});
  // const followToggle = new FollowToggle(button);
});
