class FollowToggle {
  constructor ($el) {
    this.$el = $el;
    // this.handleClick = this.handleClick.bind(this);
    this.user_id = $el.attr('data-user-id');
    this.followState = $el.attr('data-initial-follow-state');

    this.render();
    $el.on('click', (event) => {
      // console.log('im clicked');
      this.handleClick(event);
    });
  }

  render () {
    const string = this.followState === "unfollowed" ? "Follow!" : "Unfollow!";
    // console.log('we renderin?');
    // console.log(this.followState);
    this.$el.html(string);
  }

  handleClick (event) {
    event.preventDefault();
    // console.log(this.user_id);
    if (this.followState === "unfollowed") {
      $.ajax({
        method: "POST",
        url: `/users/${this.user_id}/follow`,
        data: { user_id: this.user_id },
        dataType: "JSON",
        success: function (response) {
          this.$el.attr('data-initial-follow-state', 'followed');
          this.followState = this.$el.attr('data-initial-follow-state');
          this.render();
          console.log(response);
        }.bind(this),
        // error: err => console.log(err)
      });
    } else if (this.followState === "followed") {
      $.ajax({
        method: "DELETE",
        url: `/users/${this.user_id}/follow`,
        data: { user_id: this.user_id },
        dataType: "JSON",
        success: function (response) {
          this.$el.attr('data-initial-follow-state', 'unfollowed');
          this.followState = this.$el.attr('data-initial-follow-state');
          this.render();
          console.log(response);
        }.bind(this),
        // error: err => console.log(err)
      });
    }
  }
}


module.exports = FollowToggle;
