/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);

$(() => {
  const $buttons = $('.follow-toggle');
  $buttons.each((idx, el) => {
    // console.log(el);
    let $button = $(el);
    new FollowToggle($button);
});
  // const followToggle = new FollowToggle(button);
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map