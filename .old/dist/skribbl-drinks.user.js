// ==UserScript==
// @name      Skribbl Drinks
// @namespace Garm
// @match     https://skribbl.io/*
// @grant     none
// ==/UserScript==

(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var qwery = createCommonjsModule(function (module) {
	/*!
	  * @preserve Qwery - A selector engine
	  * https://github.com/ded/qwery
	  * (c) Dustin Diaz 2014 | License MIT
	  */

	(function (name, context, definition) {
	  if ( module.exports) module.exports = definition();
	  else context[name] = definition();
	})('qwery', commonjsGlobal, function () {

	  var classOnly = /^\.([\w\-]+)$/
	    , doc = document
	    , win = window
	    , html = doc.documentElement
	    , nodeType = 'nodeType';
	  var isAncestor = 'compareDocumentPosition' in html ?
	    function (element, container) {
	      return (container.compareDocumentPosition(element) & 16) == 16
	    } :
	    function (element, container) {
	      container = container == doc || container == window ? html : container;
	      return container !== element && container.contains(element)
	    };

	  function toArray(ar) {
	    return [].slice.call(ar, 0)
	  }

	  function isNode(el) {
	    var t;
	    return el && typeof el === 'object' && (t = el.nodeType) && (t == 1 || t == 9)
	  }

	  function arrayLike(o) {
	    return (typeof o === 'object' && isFinite(o.length))
	  }

	  function flatten(ar) {
	    for (var r = [], i = 0, l = ar.length; i < l; ++i) arrayLike(ar[i]) ? (r = r.concat(ar[i])) : (r[r.length] = ar[i]);
	    return r
	  }

	  function uniq(ar) {
	    var a = [], i, j;
	    label:
	    for (i = 0; i < ar.length; i++) {
	      for (j = 0; j < a.length; j++) {
	        if (a[j] == ar[i]) {
	          continue label
	        }
	      }
	      a[a.length] = ar[i];
	    }
	    return a
	  }


	  function normalizeRoot(root) {
	    if (!root) return doc
	    if (typeof root == 'string') return qwery(root)[0]
	    if (!root[nodeType] && arrayLike(root)) return root[0]
	    return root
	  }

	  /**
	   * @param {string|Array.<Element>|Element|Node} selector
	   * @param {string|Array.<Element>|Element|Node=} opt_root
	   * @return {Array.<Element>}
	   */
	  function qwery(selector, opt_root) {
	    var m, root = normalizeRoot(opt_root);
	    if (!root || !selector) return []
	    if (selector === win || isNode(selector)) {
	      return !opt_root || (selector !== win && isNode(root) && isAncestor(selector, root)) ? [selector] : []
	    }
	    if (selector && arrayLike(selector)) return flatten(selector)


	    if (doc.getElementsByClassName && selector == 'string' && (m = selector.match(classOnly))) {
	      return toArray((root).getElementsByClassName(m[1]))
	    }
	    // using duck typing for 'a' window or 'a' document (not 'the' window || document)
	    if (selector && (selector.document || (selector.nodeType && selector.nodeType == 9))) {
	      return !opt_root ? [selector] : []
	    }
	    return toArray((root).querySelectorAll(selector))
	  }

	  qwery.uniq = uniq;

	  return qwery
	});
	});

	var bonzo = createCommonjsModule(function (module) {
	/*!
	  * Bonzo: DOM Utility (c) Dustin Diaz 2012
	  * https://github.com/ded/bonzo
	  * License MIT
	  */
	(function (name, context, definition) {
	  if ( module.exports) module.exports = definition();
	  else context[name] = definition();
	})('bonzo', commonjsGlobal, function() {
	  var win = window
	    , doc = win.document
	    , html = doc.documentElement
	    , parentNode = 'parentNode'
	    , specialAttributes = /^(checked|value|selected|disabled)$/i
	      // tags that we have trouble inserting *into*
	    , specialTags = /^(select|fieldset|table|tbody|tfoot|td|tr|colgroup)$/i
	    , simpleScriptTagRe = /\s*<script +src=['"]([^'"]+)['"]>/
	    , table = ['<table>', '</table>', 1]
	    , td = ['<table><tbody><tr>', '</tr></tbody></table>', 3]
	    , option = ['<select>', '</select>', 1]
	    , noscope = ['_', '', 0, 1]
	    , tagMap = { // tags that we have trouble *inserting*
	          thead: table, tbody: table, tfoot: table, colgroup: table, caption: table
	        , tr: ['<table><tbody>', '</tbody></table>', 2]
	        , th: td , td: td
	        , col: ['<table><colgroup>', '</colgroup></table>', 2]
	        , fieldset: ['<form>', '</form>', 1]
	        , legend: ['<form><fieldset>', '</fieldset></form>', 2]
	        , option: option, optgroup: option
	        , script: noscope, style: noscope, link: noscope, param: noscope, base: noscope
	      }
	    , stateAttributes = /^(checked|selected|disabled)$/
	    , hasClass, addClass, removeClass
	    , uidMap = {}
	    , uuids = 0
	    , digit = /^-?[\d\.]+$/
	    , dattr = /^data-(.+)$/
	    , px = 'px'
	    , setAttribute = 'setAttribute'
	    , getAttribute = 'getAttribute'
	    , features = function() {
	        var e = doc.createElement('p');
	        return {
	          transform: function () {
	            var props = ['transform', 'webkitTransform', 'MozTransform', 'OTransform', 'msTransform'], i;
	            for (i = 0; i < props.length; i++) {
	              if (props[i] in e.style) return props[i]
	            }
	          }()
	        , classList: 'classList' in e
	        }
	      }()
	    , whitespaceRegex = /\s+/
	    , toString = String.prototype.toString
	    , unitless = { lineHeight: 1, zoom: 1, zIndex: 1, opacity: 1, boxFlex: 1, WebkitBoxFlex: 1, MozBoxFlex: 1 }
	    , query = doc.querySelectorAll && function (selector) { return doc.querySelectorAll(selector) };


	  function getStyle(el, property) {
	    var value = null
	      , computed = doc.defaultView.getComputedStyle(el, '');
	    computed && (value = computed[property]);
	    return el.style[property] || value
	  }


	  function isNode(node) {
	    return node && node.nodeName && (node.nodeType == 1 || node.nodeType == 11)
	  }


	  function normalize(node, host, clone) {
	    var i, l, ret;
	    if (typeof node == 'string') return bonzo.create(node)
	    if (isNode(node)) node = [ node ];
	    if (clone) {
	      ret = []; // don't change original array
	      for (i = 0, l = node.length; i < l; i++) ret[i] = cloneNode(host, node[i]);
	      return ret
	    }
	    return node
	  }

	  /**
	   * @param {string} c a class name to test
	   * @return {boolean}
	   */
	  function classReg(c) {
	    return new RegExp('(^|\\s+)' + c + '(\\s+|$)')
	  }


	  /**
	   * @param {Bonzo|Array} ar
	   * @param {function(Object, number, (Bonzo|Array))} fn
	   * @param {Object=} opt_scope
	   * @param {boolean=} opt_rev
	   * @return {Bonzo|Array}
	   */
	  function each(ar, fn, opt_scope, opt_rev) {
	    var ind, i = 0, l = ar.length;
	    for (; i < l; i++) {
	      ind = opt_rev ? ar.length - i - 1 : i;
	      fn.call(opt_scope || ar[ind], ar[ind], ind, ar);
	    }
	    return ar
	  }


	  /**
	   * @param {Bonzo|Array} ar
	   * @param {function(Object, number, (Bonzo|Array))} fn
	   * @param {Object=} opt_scope
	   * @return {Bonzo|Array}
	   */
	  function deepEach(ar, fn, opt_scope) {
	    for (var i = 0, l = ar.length; i < l; i++) {
	      if (isNode(ar[i])) {
	        deepEach(ar[i].childNodes, fn, opt_scope);
	        fn.call(opt_scope || ar[i], ar[i], i, ar);
	      }
	    }
	    return ar
	  }


	  /**
	   * @param {string} s
	   * @return {string}
	   */
	  function camelize(s) {
	    return s.replace(/-(.)/g, function (m, m1) {
	      return m1.toUpperCase()
	    })
	  }


	  /**
	   * @param {string} s
	   * @return {string}
	   */
	  function decamelize(s) {
	    return s ? s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() : s
	  }


	  /**
	   * @param {Element} el
	   * @return {*}
	   */
	  function data(el) {
	    el[getAttribute]('data-node-uid') || el[setAttribute]('data-node-uid', ++uuids);
	    var uid = el[getAttribute]('data-node-uid');
	    return uidMap[uid] || (uidMap[uid] = {})
	  }


	  /**
	   * removes the data associated with an element
	   * @param {Element} el
	   */
	  function clearData(el) {
	    var uid = el[getAttribute]('data-node-uid');
	    if (uid) delete uidMap[uid];
	  }


	  function dataValue(d) {
	    var f;
	    try {
	      return (d === null || d === undefined) ? undefined :
	        d === 'true' ? true :
	          d === 'false' ? false :
	            d === 'null' ? null :
	              (f = parseFloat(d)) == d ? f : d;
	    } catch(e) {}
	    return undefined
	  }


	  /**
	   * @param {Bonzo|Array} ar
	   * @param {function(Object, number, (Bonzo|Array))} fn
	   * @param {Object=} opt_scope
	   * @return {boolean} whether `some`thing was found
	   */
	  function some(ar, fn, opt_scope) {
	    for (var i = 0, j = ar.length; i < j; ++i) if (fn.call(opt_scope || null, ar[i], i, ar)) return true
	    return false
	  }


	  /**
	   * this could be a giant enum of CSS properties
	   * but in favor of file size sans-closure deadcode optimizations
	   * we're just asking for any ol string
	   * then it gets transformed into the appropriate style property for JS access
	   * @param {string} p
	   * @return {string}
	   */
	  function styleProperty(p) {
	      (p == 'transform' && (p = features.transform)) ||
	        (/^transform-?[Oo]rigin$/.test(p) && (p = features.transform + 'Origin'));
	      return p ? camelize(p) : null
	  }

	  // this insert method is intense
	  function insert(target, host, fn, rev) {
	    var i = 0, self = host || this, r = []
	      // target nodes could be a css selector if it's a string and a selector engine is present
	      // otherwise, just use target
	      , nodes = query && typeof target == 'string' && target.charAt(0) != '<' ? query(target) : target;
	    // normalize each node in case it's still a string and we need to create nodes on the fly
	    each(normalize(nodes), function (t, j) {
	      each(self, function (el) {
	        fn(t, r[i++] = j > 0 ? cloneNode(self, el) : el);
	      }, null, rev);
	    }, this, rev);
	    self.length = i;
	    each(r, function (e) {
	      self[--i] = e;
	    }, null, !rev);
	    return self
	  }


	  /**
	   * sets an element to an explicit x/y position on the page
	   * @param {Element} el
	   * @param {?number} x
	   * @param {?number} y
	   */
	  function xy(el, x, y) {
	    var $el = bonzo(el)
	      , style = $el.css('position')
	      , offset = $el.offset()
	      , rel = 'relative'
	      , isRel = style == rel
	      , delta = [parseInt($el.css('left'), 10), parseInt($el.css('top'), 10)];

	    if (style == 'static') {
	      $el.css('position', rel);
	      style = rel;
	    }

	    isNaN(delta[0]) && (delta[0] = isRel ? 0 : el.offsetLeft);
	    isNaN(delta[1]) && (delta[1] = isRel ? 0 : el.offsetTop);

	    x != null && (el.style.left = x - offset.left + delta[0] + px);
	    y != null && (el.style.top = y - offset.top + delta[1] + px);

	  }

	  // classList support for class management
	  // altho to be fair, the api sucks because it won't accept multiple classes at once
	  if (features.classList) {
	    hasClass = function (el, c) {
	      return el.classList.contains(c)
	    };
	    addClass = function (el, c) {
	      el.classList.add(c);
	    };
	    removeClass = function (el, c) {
	      el.classList.remove(c);
	    };
	  }
	  else {
	    hasClass = function (el, c) {
	      return classReg(c).test(el.className)
	    };
	    addClass = function (el, c) {
	      el.className = (el.className + ' ' + c).trim();
	    };
	    removeClass = function (el, c) {
	      el.className = (el.className.replace(classReg(c), ' ')).trim();
	    };
	  }


	  /**
	   * this allows method calling for setting values
	   *
	   * @example
	   * bonzo(elements).css('color', function (el) {
	   *   return el.getAttribute('data-original-color')
	   * })
	   *
	   * @param {Element} el
	   * @param {function (Element)|string} v
	   * @return {string}
	   */
	  function setter(el, v) {
	    return typeof v == 'function' ? v.call(el, el) : v
	  }

	  function scroll(x, y, type) {
	    var el = this[0];
	    if (!el) return this
	    if (x == null && y == null) {
	      return (isBody(el) ? getWindowScroll() : { x: el.scrollLeft, y: el.scrollTop })[type]
	    }
	    if (isBody(el)) {
	      win.scrollTo(x, y);
	    } else {
	      x != null && (el.scrollLeft = x);
	      y != null && (el.scrollTop = y);
	    }
	    return this
	  }

	  /**
	   * @constructor
	   * @param {Array.<Element>|Element|Node|string} elements
	   */
	  function Bonzo(elements) {
	    this.length = 0;
	    if (elements) {
	      elements = typeof elements !== 'string' &&
	        !elements.nodeType &&
	        typeof elements.length !== 'undefined' ?
	          elements :
	          [elements];
	      this.length = elements.length;
	      for (var i = 0; i < elements.length; i++) this[i] = elements[i];
	    }
	  }

	  Bonzo.prototype = {

	      /**
	       * @param {number} index
	       * @return {Element|Node}
	       */
	      get: function (index) {
	        return this[index] || null
	      }

	      // itetators
	      /**
	       * @param {function(Element|Node)} fn
	       * @param {Object=} opt_scope
	       * @return {Bonzo}
	       */
	    , each: function (fn, opt_scope) {
	        return each(this, fn, opt_scope)
	      }

	      /**
	       * @param {Function} fn
	       * @param {Object=} opt_scope
	       * @return {Bonzo}
	       */
	    , deepEach: function (fn, opt_scope) {
	        return deepEach(this, fn, opt_scope)
	      }


	      /**
	       * @param {Function} fn
	       * @param {Function=} opt_reject
	       * @return {Array}
	       */
	    , map: function (fn, opt_reject) {
	        var m = [], n, i;
	        for (i = 0; i < this.length; i++) {
	          n = fn.call(this, this[i], i);
	          opt_reject ? (opt_reject(n) && m.push(n)) : m.push(n);
	        }
	        return m
	      }

	    // text and html inserters!

	    /**
	     * @param {string} h the HTML to insert
	     * @param {boolean=} opt_text whether to set or get text content
	     * @return {Bonzo|string}
	     */
	    , html: function (h, opt_text) {
	        var method = opt_text
	              ? 'textContent'
	              : 'innerHTML'
	          , that = this
	          , append = function (el, i) {
	              each(normalize(h, that, i), function (node) {
	                el.appendChild(node);
	              });
	            }
	          , updateElement = function (el, i) {
	              try {
	                if (opt_text || (typeof h == 'string' && !specialTags.test(el.tagName))) {
	                  return el[method] = h
	                }
	              } catch (e) {}
	              append(el, i);
	            };
	        return typeof h != 'undefined'
	          ? this.empty().each(updateElement)
	          : this[0] ? this[0][method] : ''
	      }

	      /**
	       * @param {string=} opt_text the text to set, otherwise this is a getter
	       * @return {Bonzo|string}
	       */
	    , text: function (opt_text) {
	        return this.html(opt_text, true)
	      }

	      // more related insertion methods

	      /**
	       * @param {Bonzo|string|Element|Array} node
	       * @return {Bonzo}
	       */
	    , append: function (node) {
	        var that = this;
	        return this.each(function (el, i) {
	          each(normalize(node, that, i), function (i) {
	            el.appendChild(i);
	          });
	        })
	      }


	      /**
	       * @param {Bonzo|string|Element|Array} node
	       * @return {Bonzo}
	       */
	    , prepend: function (node) {
	        var that = this;
	        return this.each(function (el, i) {
	          var first = el.firstChild;
	          each(normalize(node, that, i), function (i) {
	            el.insertBefore(i, first);
	          });
	        })
	      }


	      /**
	       * @param {Bonzo|string|Element|Array} target the location for which you'll insert your new content
	       * @param {Object=} opt_host an optional host scope (primarily used when integrated with Ender)
	       * @return {Bonzo}
	       */
	    , appendTo: function (target, opt_host) {
	        return insert.call(this, target, opt_host, function (t, el) {
	          t.appendChild(el);
	        })
	      }


	      /**
	       * @param {Bonzo|string|Element|Array} target the location for which you'll insert your new content
	       * @param {Object=} opt_host an optional host scope (primarily used when integrated with Ender)
	       * @return {Bonzo}
	       */
	    , prependTo: function (target, opt_host) {
	        return insert.call(this, target, opt_host, function (t, el) {
	          t.insertBefore(el, t.firstChild);
	        }, 1)
	      }


	      /**
	       * @param {Bonzo|string|Element|Array} node
	       * @return {Bonzo}
	       */
	    , before: function (node) {
	        var that = this;
	        return this.each(function (el, i) {
	          each(normalize(node, that, i), function (i) {
	            el[parentNode].insertBefore(i, el);
	          });
	        })
	      }


	      /**
	       * @param {Bonzo|string|Element|Array} node
	       * @return {Bonzo}
	       */
	    , after: function (node) {
	        var that = this;
	        return this.each(function (el, i) {
	          each(normalize(node, that, i), function (i) {
	            el[parentNode].insertBefore(i, el.nextSibling);
	          }, null, 1);
	        })
	      }


	      /**
	       * @param {Bonzo|string|Element|Array} target the location for which you'll insert your new content
	       * @param {Object=} opt_host an optional host scope (primarily used when integrated with Ender)
	       * @return {Bonzo}
	       */
	    , insertBefore: function (target, opt_host) {
	        return insert.call(this, target, opt_host, function (t, el) {
	          t[parentNode].insertBefore(el, t);
	        })
	      }


	      /**
	       * @param {Bonzo|string|Element|Array} target the location for which you'll insert your new content
	       * @param {Object=} opt_host an optional host scope (primarily used when integrated with Ender)
	       * @return {Bonzo}
	       */
	    , insertAfter: function (target, opt_host) {
	        return insert.call(this, target, opt_host, function (t, el) {
	          var sibling = t.nextSibling;
	          sibling ?
	            t[parentNode].insertBefore(el, sibling) :
	            t[parentNode].appendChild(el);
	        }, 1)
	      }


	      /**
	       * @param {Bonzo|string|Element|Array} node
	       * @return {Bonzo}
	       */
	    , replaceWith: function (node) {
	        var that = this;
	        return this.each(function (el, i) {
	          each(normalize(node, that, i), function (i) {
	            el[parentNode] && el[parentNode].replaceChild(i, el);
	          });
	        })
	      }

	      /**
	       * @param {Object=} opt_host an optional host scope (primarily used when integrated with Ender)
	       * @return {Bonzo}
	       */
	    , clone: function (opt_host) {
	        var ret = [] // don't change original array
	          , l, i;
	        for (i = 0, l = this.length; i < l; i++) ret[i] = cloneNode(opt_host || this, this[i]);
	        return bonzo(ret)
	      }

	      // class management

	      /**
	       * @param {string} c
	       * @return {Bonzo}
	       */
	    , addClass: function (c) {
	        c = toString.call(c).split(whitespaceRegex);
	        return this.each(function (el) {
	          // we `each` here so you can do $el.addClass('foo bar')
	          each(c, function (c) {
	            if (c && !hasClass(el, setter(el, c)))
	              addClass(el, setter(el, c));
	          });
	        })
	      }


	      /**
	       * @param {string} c
	       * @return {Bonzo}
	       */
	    , removeClass: function (c) {
	        c = toString.call(c).split(whitespaceRegex);
	        return this.each(function (el) {
	          each(c, function (c) {
	            if (c && hasClass(el, setter(el, c)))
	              removeClass(el, setter(el, c));
	          });
	        })
	      }


	      /**
	       * @param {string} c
	       * @return {boolean}
	       */
	    , hasClass: function (c) {
	        c = toString.call(c).split(whitespaceRegex);
	        return some(this, function (el) {
	          return some(c, function (c) {
	            return c && hasClass(el, c)
	          })
	        })
	      }


	      /**
	       * @param {string} c classname to toggle
	       * @param {boolean=} opt_condition whether to add or remove the class straight away
	       * @return {Bonzo}
	       */
	    , toggleClass: function (c, opt_condition) {
	        c = toString.call(c).split(whitespaceRegex);
	        return this.each(function (el) {
	          each(c, function (c) {
	            if (c) {
	              typeof opt_condition !== 'undefined' ?
	                opt_condition ? !hasClass(el, c) && addClass(el, c) : removeClass(el, c) :
	                hasClass(el, c) ? removeClass(el, c) : addClass(el, c);
	            }
	          });
	        })
	      }

	      // display togglers

	      /**
	       * @param {string=} opt_type useful to set back to anything other than an empty string
	       * @return {Bonzo}
	       */
	    , show: function (opt_type) {
	        opt_type = typeof opt_type == 'string' ? opt_type : '';
	        return this.each(function (el) {
	          el.style.display = opt_type;
	        })
	      }


	      /**
	       * @return {Bonzo}
	       */
	    , hide: function () {
	        return this.each(function (el) {
	          el.style.display = 'none';
	        })
	      }


	      /**
	       * @param {Function=} opt_callback
	       * @param {string=} opt_type
	       * @return {Bonzo}
	       */
	    , toggle: function (opt_callback, opt_type) {
	        opt_type = typeof opt_type == 'string' ? opt_type : '';
	        typeof opt_callback != 'function' && (opt_callback = null);
	        return this.each(function (el) {
	          el.style.display = (el.offsetWidth || el.offsetHeight) ? 'none' : opt_type;
	          opt_callback && opt_callback.call(el);
	        })
	      }


	      // DOM Walkers & getters

	      /**
	       * @return {Element|Node}
	       */
	    , first: function () {
	        return bonzo(this.length ? this[0] : [])
	      }


	      /**
	       * @return {Element|Node}
	       */
	    , last: function () {
	        return bonzo(this.length ? this[this.length - 1] : [])
	      }


	      /**
	       * @return {Element|Node}
	       */
	    , next: function () {
	        return this.related('nextSibling')
	      }


	      /**
	       * @return {Element|Node}
	       */
	    , previous: function () {
	        return this.related('previousSibling')
	      }


	      /**
	       * @return {Element|Node}
	       */
	    , parent: function() {
	        return this.related(parentNode)
	      }


	      /**
	       * @private
	       * @param {string} method the directional DOM method
	       * @return {Element|Node}
	       */
	    , related: function (method) {
	        return bonzo(this.map(
	          function (el) {
	            el = el[method];
	            while (el && el.nodeType !== 1) {
	              el = el[method];
	            }
	            return el || 0
	          },
	          function (el) {
	            return el
	          }
	        ))
	      }


	      /**
	       * @return {Bonzo}
	       */
	    , focus: function () {
	        this.length && this[0].focus();
	        return this
	      }


	      /**
	       * @return {Bonzo}
	       */
	    , blur: function () {
	        this.length && this[0].blur();
	        return this
	      }

	      // style getter setter & related methods

	      /**
	       * @param {Object|string} o
	       * @param {string=} opt_v
	       * @return {Bonzo|string}
	       */
	    , css: function (o, opt_v) {
	        var p, iter = o;
	        // is this a request for just getting a style?
	        if (opt_v === undefined && typeof o == 'string') {
	          // repurpose 'v'
	          opt_v = this[0];
	          if (!opt_v) return null
	          if (opt_v === doc || opt_v === win) {
	            p = (opt_v === doc) ? bonzo.doc() : bonzo.viewport();
	            return o == 'width' ? p.width : o == 'height' ? p.height : ''
	          }
	          return (o = styleProperty(o)) ? getStyle(opt_v, o) : null
	        }

	        if (typeof o == 'string') {
	          iter = {};
	          iter[o] = opt_v;
	        }

	        function fn(el, p, v) {
	          for (var k in iter) {
	            if (iter.hasOwnProperty(k)) {
	              v = iter[k];
	              // change "5" to "5px" - unless you're line-height, which is allowed
	              (p = styleProperty(k)) && digit.test(v) && !(p in unitless) && (v += px);
	              try { el.style[p] = setter(el, v); } catch(e) {}
	            }
	          }
	        }
	        return this.each(fn)
	      }


	      /**
	       * @param {number=} opt_x
	       * @param {number=} opt_y
	       * @return {Bonzo|number}
	       */
	    , offset: function (opt_x, opt_y) {
	        if (opt_x && typeof opt_x == 'object' && (typeof opt_x.top == 'number' || typeof opt_x.left == 'number')) {
	          return this.each(function (el) {
	            xy(el, opt_x.left, opt_x.top);
	          })
	        } else if (typeof opt_x == 'number' || typeof opt_y == 'number') {
	          return this.each(function (el) {
	            xy(el, opt_x, opt_y);
	          })
	        }
	        if (!this[0]) return {
	            top: 0
	          , left: 0
	          , height: 0
	          , width: 0
	        }
	        var el = this[0]
	          , de = el.ownerDocument.documentElement
	          , bcr = el.getBoundingClientRect()
	          , scroll = getWindowScroll()
	          , width = el.offsetWidth
	          , height = el.offsetHeight
	          , top = bcr.top + scroll.y - Math.max(0, de && de.clientTop, doc.body.clientTop)
	          , left = bcr.left + scroll.x - Math.max(0, de && de.clientLeft, doc.body.clientLeft);

	        return {
	            top: top
	          , left: left
	          , height: height
	          , width: width
	        }
	      }


	      /**
	       * @return {number}
	       */
	    , dim: function () {
	        if (!this.length) return { height: 0, width: 0 }
	        var el = this[0]
	          , de = el.nodeType == 9 && el.documentElement // document
	          , orig = !de && !!el.style && !el.offsetWidth && !el.offsetHeight ?
	             // el isn't visible, can't be measured properly, so fix that
	             function (t) {
	               var s = {
	                   position: el.style.position || ''
	                 , visibility: el.style.visibility || ''
	                 , display: el.style.display || ''
	               };
	               t.first().css({
	                   position: 'absolute'
	                 , visibility: 'hidden'
	                 , display: 'block'
	               });
	               return s
	            }(this) : null
	          , width = de
	              ? Math.max(el.body.scrollWidth, el.body.offsetWidth, de.scrollWidth, de.offsetWidth, de.clientWidth)
	              : el.offsetWidth
	          , height = de
	              ? Math.max(el.body.scrollHeight, el.body.offsetHeight, de.scrollHeight, de.offsetHeight, de.clientHeight)
	              : el.offsetHeight;

	        orig && this.first().css(orig);
	        return {
	            height: height
	          , width: width
	        }
	      }

	      // attributes are hard. go shopping

	      /**
	       * @param {string} k an attribute to get or set
	       * @param {string=} opt_v the value to set
	       * @return {Bonzo|string}
	       */
	    , attr: function (k, opt_v) {
	        var el = this[0]
	          , n;

	        if (typeof k != 'string' && !(k instanceof String)) {
	          for (n in k) {
	            k.hasOwnProperty(n) && this.attr(n, k[n]);
	          }
	          return this
	        }

	        return typeof opt_v == 'undefined' ?
	          !el ? null : specialAttributes.test(k) ?
	            stateAttributes.test(k) && typeof el[k] == 'string' ?
	              true : el[k] :  el[getAttribute](k) :
	          this.each(function (el) {
	            specialAttributes.test(k) ? (el[k] = setter(el, opt_v)) : el[setAttribute](k, setter(el, opt_v));
	          })
	      }


	      /**
	       * @param {string} k
	       * @return {Bonzo}
	       */
	    , removeAttr: function (k) {
	        return this.each(function (el) {
	          stateAttributes.test(k) ? (el[k] = false) : el.removeAttribute(k);
	        })
	      }


	      /**
	       * @param {string=} opt_s
	       * @return {Bonzo|string}
	       */
	    , val: function (s) {
	        return (typeof s == 'string' || typeof s == 'number') ?
	          this.attr('value', s) :
	          this.length ? this[0].value : null
	      }

	      // use with care and knowledge. this data() method uses data attributes on the DOM nodes
	      // to do this differently costs a lot more code. c'est la vie
	      /**
	       * @param {string|Object=} opt_k the key for which to get or set data
	       * @param {Object=} opt_v
	       * @return {Bonzo|Object}
	       */
	    , data: function (opt_k, opt_v) {
	        var el = this[0], o, m;
	        if (typeof opt_v === 'undefined') {
	          if (!el) return null
	          o = data(el);
	          if (typeof opt_k === 'undefined') {
	            each(el.attributes, function (a) {
	              (m = ('' + a.name).match(dattr)) && (o[camelize(m[1])] = dataValue(a.value));
	            });
	            return o
	          } else {
	            if (typeof o[opt_k] === 'undefined')
	              o[opt_k] = dataValue(this.attr('data-' + decamelize(opt_k)));
	            return o[opt_k]
	          }
	        } else {
	          return this.each(function (el) { data(el)[opt_k] = opt_v; })
	        }
	      }

	      // DOM detachment & related

	      /**
	       * @return {Bonzo}
	       */
	    , remove: function () {
	        this.deepEach(clearData);
	        return this.detach()
	      }


	      /**
	       * @return {Bonzo}
	       */
	    , empty: function () {
	        return this.each(function (el) {
	          deepEach(el.childNodes, clearData);

	          while (el.firstChild) {
	            el.removeChild(el.firstChild);
	          }
	        })
	      }


	      /**
	       * @return {Bonzo}
	       */
	    , detach: function () {
	        return this.each(function (el) {
	          el[parentNode] && el[parentNode].removeChild(el);
	        })
	      }

	      // who uses a mouse anyway? oh right.

	      /**
	       * @param {number} y
	       */
	    , scrollTop: function (y) {
	        return scroll.call(this, null, y, 'y')
	      }


	      /**
	       * @param {number} x
	       */
	    , scrollLeft: function (x) {
	        return scroll.call(this, x, null, 'x')
	      }

	  };


	  function cloneNode(host, el) {
	    var c = el.cloneNode(true)
	      , cloneElems
	      , elElems
	      , i;

	    // check for existence of an event cloner
	    // preferably https://github.com/fat/bean
	    // otherwise Bonzo won't do this for you
	    if (host.$ && typeof host.cloneEvents == 'function') {
	      host.$(c).cloneEvents(el);

	      // clone events from every child node
	      cloneElems = host.$(c).find('*');
	      elElems = host.$(el).find('*');

	      for (i = 0; i < elElems.length; i++)
	        host.$(cloneElems[i]).cloneEvents(elElems[i]);
	    }
	    return c
	  }

	  function isBody(element) {
	    return element === win || (/^(?:body|html)$/i).test(element.tagName)
	  }

	  function getWindowScroll() {
	    return { x: win.pageXOffset || html.scrollLeft, y: win.pageYOffset || html.scrollTop }
	  }

	  function createScriptFromHtml(html) {
	    var scriptEl = document.createElement('script')
	      , matches = html.match(simpleScriptTagRe);
	    scriptEl.src = matches[1];
	    return scriptEl
	  }

	  /**
	   * @param {Array.<Element>|Element|Node|string} els
	   * @return {Bonzo}
	   */
	  function bonzo(els) {
	    return new Bonzo(els)
	  }

	  bonzo.setQueryEngine = function (q) {
	    query = q;
	    delete bonzo.setQueryEngine;
	  };

	  bonzo.aug = function (o, target) {
	    // for those standalone bonzo users. this love is for you.
	    for (var k in o) {
	      o.hasOwnProperty(k) && ((target || Bonzo.prototype)[k] = o[k]);
	    }
	  };

	  bonzo.create = function (node) {
	    // hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
	    return typeof node == 'string' && node !== '' ?
	      function () {
	        if (simpleScriptTagRe.test(node)) return [createScriptFromHtml(node)]
	        var tag = node.match(/^\s*<([^\s>]+)/)
	          , el = doc.createElement('div')
	          , els = []
	          , p = tag ? tagMap[tag[1].toLowerCase()] : null
	          , dep = p ? p[2] + 1 : 1
	          , ns = p && p[3]
	          , pn = parentNode;

	        el.innerHTML = p ? (p[0] + node + p[1]) : node;
	        while (dep--) el = el.firstChild;
	        // for IE NoScope, we may insert cruft at the begining just to get it to work
	        if (ns && el && el.nodeType !== 1) el = el.nextSibling;
	        do {
	          if (!tag || el.nodeType == 1) {
	            els.push(el);
	          }
	        } while (el = el.nextSibling)
	        // IE < 9 gives us a parentNode which messes up insert() check for cloning
	        // `dep` > 1 can also cause problems with the insert() check (must do this last)
	        each(els, function(el) { el[pn] && el[pn].removeChild(el); });
	        return els
	      }() : isNode(node) ? [node.cloneNode(true)] : []
	  };

	  bonzo.doc = function () {
	    var vp = bonzo.viewport();
	    return {
	        width: Math.max(doc.body.scrollWidth, html.scrollWidth, vp.width)
	      , height: Math.max(doc.body.scrollHeight, html.scrollHeight, vp.height)
	    }
	  };

	  bonzo.firstChild = function (el) {
	    for (var c = el.childNodes, i = 0, j = (c && c.length) || 0, e; i < j; i++) {
	      if (c[i].nodeType === 1) e = c[j = i];
	    }
	    return e
	  };

	  bonzo.viewport = function () {
	    return {
	        width: win.innerWidth
	      , height: win.innerHeight
	    }
	  };

	  bonzo.isAncestor = 'compareDocumentPosition' in html ?
	    function (container, element) {
	      return (container.compareDocumentPosition(element) & 16) == 16
	    } :
	    function (container, element) {
	      return container !== element && container.contains(element);
	    };

	  return bonzo
	}); // the only line we care about using a semi-colon. placed here for concatenation tools
	});

	function parse(node) {
	    const message = node.textContent;
	    const color = node.style.color;
	    let matches;

	    matches = /^(.+?): .*/g.exec(message);
	    if (!!matches && color == 'rgb(0, 0, 0)') {
	        // console.log(matches[1] + ' guessed')

	        return {
	            type: 'GUESS',
	            name: matches[1],
	        }
	    }
	    
	    matches = /^The word was '.+?'/g.exec(message);
	    if (!!matches) {
	        // console.log('new word revealed')

	        return {
	            type: 'WORD_REVEALED',
	        }
	    }

	    matches = /^(.+?) is drawing now!/g.exec(message);
	    if (!!matches) {
	        // console.log(matches[1] + ' started drawing')

	        return {
	            type: 'START_DRAWING',
	            name: matches[1],
	        }
	    }

	    matches = /^(.+?) guessed the word!/g.exec(message);
	    if (!!matches) {
	        // console.log(matches[1] + ' guessed the word')

	        return {
	            type: 'GUESS_RIGHT',
	            name: matches[1],
	        }
	    }

	    matches = /^(.+?) joined./g.exec(message);
	    if (!!matches) {
	        // console.log(matches[1] + ' joined')

	        return {
	            type: 'JOINED',
	            name: matches[1],
	        }
	    }

	    matches = /^(.+?) left./g.exec(message);
	    if (!!matches) {
	        // console.log(matches[1] + ' left')

	        return {
	            type: 'LEFT',
	            name: matches[1],
	        }
	    }

	    return {
	        type: 'UNKNOWN',
	    }
	}

	const containerGamePlayers = qwery('#containerGamePlayers')[0];

	function getPlayers() {
	    const result = [];
	    for (const value of containerGamePlayers.children) {
	        const name = qwery('.name', value)[0].textContent.replace(' (You)', '');
	        const id = bonzo(value).attr('id');

	        result.push({ name, id });
	    }
	    return result
	}

	function findPlayer(name) {
	    for (const player of getPlayers()) {
	        if (player.name === name) {
	            return player
	        }
	    }
	}

	var obj;
	var NOTHING = typeof Symbol !== "undefined" ? Symbol("immer-nothing") : ( obj = {}, obj["immer-nothing"] = true, obj );
	var DRAFTABLE = typeof Symbol !== "undefined" && Symbol.for ? Symbol.for("immer-draftable") : "__$immer_draftable";
	var DRAFT_STATE = typeof Symbol !== "undefined" && Symbol.for ? Symbol.for("immer-state") : "__$immer_state";
	function isDraft(value) {
	  return !!value && !!value[DRAFT_STATE];
	}
	function isDraftable(value) {
	  if (!value) { return false; }
	  return isPlainObject(value) || !!value[DRAFTABLE] || !!value.constructor[DRAFTABLE];
	}
	function isPlainObject(value) {
	  if (!value || typeof value !== "object") { return false; }
	  if (Array.isArray(value)) { return true; }
	  var proto = Object.getPrototypeOf(value);
	  return !proto || proto === Object.prototype;
	}
	var assign = Object.assign || function assign(target, value) {
	  for (var key in value) {
	    if (has(value, key)) {
	      target[key] = value[key];
	    }
	  }

	  return target;
	};
	var ownKeys = typeof Reflect !== "undefined" && Reflect.ownKeys ? Reflect.ownKeys : typeof Object.getOwnPropertySymbols !== "undefined" ? function (obj) { return Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj)); } : Object.getOwnPropertyNames;
	function shallowCopy(base, invokeGetters) {
	  if ( invokeGetters === void 0 ) invokeGetters = false;

	  if (Array.isArray(base)) { return base.slice(); }
	  var clone = Object.create(Object.getPrototypeOf(base));
	  ownKeys(base).forEach(function (key) {
	    if (key === DRAFT_STATE) {
	      return; // Never copy over draft state.
	    }

	    var desc = Object.getOwnPropertyDescriptor(base, key);
	    var value = desc.value;

	    if (desc.get) {
	      if (!invokeGetters) {
	        throw new Error("Immer drafts cannot have computed properties");
	      }

	      value = desc.get.call(base);
	    }

	    if (desc.enumerable) {
	      clone[key] = value;
	    } else {
	      Object.defineProperty(clone, key, {
	        value: value,
	        writable: true,
	        configurable: true
	      });
	    }
	  });
	  return clone;
	}
	function each(value, cb) {
	  if (Array.isArray(value)) {
	    for (var i = 0; i < value.length; i++) { cb(i, value[i], value); }
	  } else {
	    ownKeys(value).forEach(function (key) { return cb(key, value[key], value); });
	  }
	}
	function isEnumerable(base, prop) {
	  var desc = Object.getOwnPropertyDescriptor(base, prop);
	  return !!desc && desc.enumerable;
	}
	function has(thing, prop) {
	  return Object.prototype.hasOwnProperty.call(thing, prop);
	}
	function is(x, y) {
	  // From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
	  if (x === y) {
	    return x !== 0 || 1 / x === 1 / y;
	  } else {
	    return x !== x && y !== y;
	  }
	}
	function clone(obj) {
	  if (!isDraftable(obj)) { return obj; }
	  if (Array.isArray(obj)) { return obj.map(clone); }
	  var cloned = Object.create(Object.getPrototypeOf(obj));

	  for (var key in obj) { cloned[key] = clone(obj[key]); }

	  return cloned;
	}
	function deepFreeze(obj) {
	  if (!isDraftable(obj) || isDraft(obj) || Object.isFrozen(obj)) { return; }
	  Object.freeze(obj);
	  if (Array.isArray(obj)) { obj.forEach(deepFreeze); }else { for (var key in obj) { deepFreeze(obj[key]); } }
	}

	/** Each scope represents a `produce` call. */

	var ImmerScope = function ImmerScope(parent) {
	  this.drafts = [];
	  this.parent = parent; // Whenever the modified draft contains a draft from another scope, we
	  // need to prevent auto-freezing so the unowned draft can be finalized.

	  this.canAutoFreeze = true; // To avoid prototype lookups:

	  this.patches = null;
	};

	ImmerScope.prototype.usePatches = function usePatches (patchListener) {
	  if (patchListener) {
	    this.patches = [];
	    this.inversePatches = [];
	    this.patchListener = patchListener;
	  }
	};

	ImmerScope.prototype.revoke = function revoke$1 () {
	  this.leave();
	  this.drafts.forEach(revoke);
	  this.drafts = null; // Make draft-related methods throw.
	};

	ImmerScope.prototype.leave = function leave () {
	  if (this === ImmerScope.current) {
	    ImmerScope.current = this.parent;
	  }
	};
	ImmerScope.current = null;

	ImmerScope.enter = function () {
	  return this.current = new ImmerScope(this.current);
	};

	function revoke(draft) {
	  draft[DRAFT_STATE].revoke();
	}

	// but share them all instead

	var descriptors = {};
	function willFinalize(scope, result, isReplaced) {
	  scope.drafts.forEach(function (draft) {
	    draft[DRAFT_STATE].finalizing = true;
	  });

	  if (!isReplaced) {
	    if (scope.patches) {
	      markChangesRecursively(scope.drafts[0]);
	    } // This is faster when we don't care about which attributes changed.


	    markChangesSweep(scope.drafts);
	  } // When a child draft is returned, look for changes.
	  else if (isDraft(result) && result[DRAFT_STATE].scope === scope) {
	      markChangesSweep(scope.drafts);
	    }
	}
	function createProxy(base, parent) {
	  var isArray = Array.isArray(base);
	  var draft = clonePotentialDraft(base);
	  each(draft, function (prop) {
	    proxyProperty(draft, prop, isArray || isEnumerable(base, prop));
	  }); // See "proxy.js" for property documentation.

	  var scope = parent ? parent.scope : ImmerScope.current;
	  var state = {
	    scope: scope,
	    modified: false,
	    finalizing: false,
	    // es5 only
	    finalized: false,
	    assigned: {},
	    parent: parent,
	    base: base,
	    draft: draft,
	    copy: null,
	    revoke: revoke$1,
	    revoked: false // es5 only

	  };
	  createHiddenProperty(draft, DRAFT_STATE, state);
	  scope.drafts.push(draft);
	  return draft;
	}

	function revoke$1() {
	  this.revoked = true;
	}

	function source(state) {
	  return state.copy || state.base;
	} // Access a property without creating an Immer draft.


	function peek(draft, prop) {
	  var state = draft[DRAFT_STATE];

	  if (state && !state.finalizing) {
	    state.finalizing = true;
	    var value = draft[prop];
	    state.finalizing = false;
	    return value;
	  }

	  return draft[prop];
	}

	function get(state, prop) {
	  assertUnrevoked(state);
	  var value = peek(source(state), prop);
	  if (state.finalizing) { return value; } // Create a draft if the value is unmodified.

	  if (value === peek(state.base, prop) && isDraftable(value)) {
	    prepareCopy(state);
	    return state.copy[prop] = createProxy(value, state);
	  }

	  return value;
	}

	function set(state, prop, value) {
	  assertUnrevoked(state);
	  state.assigned[prop] = true;

	  if (!state.modified) {
	    if (is(value, peek(source(state), prop))) { return; }
	    markChanged(state);
	    prepareCopy(state);
	  }

	  state.copy[prop] = value;
	}

	function markChanged(state) {
	  if (!state.modified) {
	    state.modified = true;
	    if (state.parent) { markChanged(state.parent); }
	  }
	}

	function prepareCopy(state) {
	  if (!state.copy) { state.copy = clonePotentialDraft(state.base); }
	}

	function clonePotentialDraft(base) {
	  var state = base && base[DRAFT_STATE];

	  if (state) {
	    state.finalizing = true;
	    var draft = shallowCopy(state.draft, true);
	    state.finalizing = false;
	    return draft;
	  }

	  return shallowCopy(base);
	}

	function proxyProperty(draft, prop, enumerable) {
	  var desc = descriptors[prop];

	  if (desc) {
	    desc.enumerable = enumerable;
	  } else {
	    descriptors[prop] = desc = {
	      configurable: true,
	      enumerable: enumerable,

	      get: function get$1() {
	        return get(this[DRAFT_STATE], prop);
	      },

	      set: function set$1(value) {
	        set(this[DRAFT_STATE], prop, value);
	      }

	    };
	  }

	  Object.defineProperty(draft, prop, desc);
	}

	function assertUnrevoked(state) {
	  if (state.revoked === true) { throw new Error("Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + JSON.stringify(source(state))); }
	} // This looks expensive, but only proxies are visited, and only objects without known changes are scanned.


	function markChangesSweep(drafts) {
	  // The natural order of drafts in the `scope` array is based on when they
	  // were accessed. By processing drafts in reverse natural order, we have a
	  // better chance of processing leaf nodes first. When a leaf node is known to
	  // have changed, we can avoid any traversal of its ancestor nodes.
	  for (var i = drafts.length - 1; i >= 0; i--) {
	    var state = drafts[i][DRAFT_STATE];

	    if (!state.modified) {
	      if (Array.isArray(state.base)) {
	        if (hasArrayChanges(state)) { markChanged(state); }
	      } else if (hasObjectChanges(state)) { markChanged(state); }
	    }
	  }
	}

	function markChangesRecursively(object) {
	  if (!object || typeof object !== "object") { return; }
	  var state = object[DRAFT_STATE];
	  if (!state) { return; }
	  var base = state.base;
	  var draft = state.draft;
	  var assigned = state.assigned;

	  if (!Array.isArray(object)) {
	    // Look for added keys.
	    Object.keys(draft).forEach(function (key) {
	      // The `undefined` check is a fast path for pre-existing keys.
	      if (base[key] === undefined && !has(base, key)) {
	        assigned[key] = true;
	        markChanged(state);
	      } else if (!assigned[key]) {
	        // Only untouched properties trigger recursion.
	        markChangesRecursively(draft[key]);
	      }
	    }); // Look for removed keys.

	    Object.keys(base).forEach(function (key) {
	      // The `undefined` check is a fast path for pre-existing keys.
	      if (draft[key] === undefined && !has(draft, key)) {
	        assigned[key] = false;
	        markChanged(state);
	      }
	    });
	  } else if (hasArrayChanges(state)) {
	    markChanged(state);
	    assigned.length = true;

	    if (draft.length < base.length) {
	      for (var i = draft.length; i < base.length; i++) { assigned[i] = false; }
	    } else {
	      for (var i$1 = base.length; i$1 < draft.length; i$1++) { assigned[i$1] = true; }
	    }

	    for (var i$2 = 0; i$2 < draft.length; i$2++) {
	      // Only untouched indices trigger recursion.
	      if (assigned[i$2] === undefined) { markChangesRecursively(draft[i$2]); }
	    }
	  }
	}

	function hasObjectChanges(state) {
	  var base = state.base;
	  var draft = state.draft; // Search for added keys and changed keys. Start at the back, because
	  // non-numeric keys are ordered by time of definition on the object.

	  var keys = Object.keys(draft);

	  for (var i = keys.length - 1; i >= 0; i--) {
	    var key = keys[i];
	    var baseValue = base[key]; // The `undefined` check is a fast path for pre-existing keys.

	    if (baseValue === undefined && !has(base, key)) {
	      return true;
	    } // Once a base key is deleted, future changes go undetected, because its
	    // descriptor is erased. This branch detects any missed changes.
	    else {
	        var value = draft[key];
	        var state$1 = value && value[DRAFT_STATE];

	        if (state$1 ? state$1.base !== baseValue : !is(value, baseValue)) {
	          return true;
	        }
	      }
	  } // At this point, no keys were added or changed.
	  // Compare key count to determine if keys were deleted.


	  return keys.length !== Object.keys(base).length;
	}

	function hasArrayChanges(state) {
	  var draft = state.draft;
	  if (draft.length !== state.base.length) { return true; } // See #116
	  // If we first shorten the length, our array interceptors will be removed.
	  // If after that new items are added, result in the same original length,
	  // those last items will have no intercepting property.
	  // So if there is no own descriptor on the last position, we know that items were removed and added
	  // N.B.: splice, unshift, etc only shift values around, but not prop descriptors, so we only have to check
	  // the last one

	  var descriptor = Object.getOwnPropertyDescriptor(draft, draft.length - 1); // descriptor can be null, but only for newly created sparse arrays, eg. new Array(10)

	  if (descriptor && !descriptor.get) { return true; } // For all other cases, we don't have to compare, as they would have been picked up by the index setters

	  return false;
	}

	function createHiddenProperty(target, prop, value) {
	  Object.defineProperty(target, prop, {
	    value: value,
	    enumerable: false,
	    writable: true
	  });
	}

	var legacyProxy = /*#__PURE__*/Object.freeze({
		willFinalize: willFinalize,
		createProxy: createProxy
	});

	function willFinalize$1() {}
	function createProxy$1(base, parent) {
	  var scope = parent ? parent.scope : ImmerScope.current;
	  var state = {
	    // Track which produce call this is associated with.
	    scope: scope,
	    // True for both shallow and deep changes.
	    modified: false,
	    // Used during finalization.
	    finalized: false,
	    // Track which properties have been assigned (true) or deleted (false).
	    assigned: {},
	    // The parent draft state.
	    parent: parent,
	    // The base state.
	    base: base,
	    // The base proxy.
	    draft: null,
	    // Any property proxies.
	    drafts: {},
	    // The base copy with any updated values.
	    copy: null,
	    // Called by the `produce` function.
	    revoke: null
	  };
	  var ref = Array.isArray(base) ? // [state] is used for arrays, to make sure the proxy is array-ish and not violate invariants,
	  // although state itself is an object
	  Proxy.revocable([state], arrayTraps) : Proxy.revocable(state, objectTraps);
	  var revoke = ref.revoke;
	  var proxy = ref.proxy;
	  state.draft = proxy;
	  state.revoke = revoke;
	  scope.drafts.push(proxy);
	  return proxy;
	}
	var objectTraps = {
	  get: get$1,

	  has: function has(target, prop) {
	    return prop in source$1(target);
	  },

	  ownKeys: function ownKeys(target) {
	    return Reflect.ownKeys(source$1(target));
	  },

	  set: set$1,
	  deleteProperty: deleteProperty,
	  getOwnPropertyDescriptor: getOwnPropertyDescriptor,

	  defineProperty: function defineProperty() {
	    throw new Error("Object.defineProperty() cannot be used on an Immer draft"); // prettier-ignore
	  },

	  getPrototypeOf: function getPrototypeOf(target) {
	    return Object.getPrototypeOf(target.base);
	  },

	  setPrototypeOf: function setPrototypeOf() {
	    throw new Error("Object.setPrototypeOf() cannot be used on an Immer draft"); // prettier-ignore
	  }

	};
	var arrayTraps = {};
	each(objectTraps, function (key, fn) {
	  arrayTraps[key] = function () {
	    arguments[0] = arguments[0][0];
	    return fn.apply(this, arguments);
	  };
	});

	arrayTraps.deleteProperty = function (state, prop) {
	  if (isNaN(parseInt(prop))) {
	    throw new Error("Immer only supports deleting array indices"); // prettier-ignore
	  }

	  return objectTraps.deleteProperty.call(this, state[0], prop);
	};

	arrayTraps.set = function (state, prop, value) {
	  if (prop !== "length" && isNaN(parseInt(prop))) {
	    throw new Error("Immer only supports setting array indices and the 'length' property"); // prettier-ignore
	  }

	  return objectTraps.set.call(this, state[0], prop, value);
	}; // returns the object we should be reading the current value from, which is base, until some change has been made


	function source$1(state) {
	  return state.copy || state.base;
	} // Access a property without creating an Immer draft.


	function peek$1(draft, prop) {
	  var state = draft[DRAFT_STATE];
	  var desc = Reflect.getOwnPropertyDescriptor(state ? source$1(state) : draft, prop);
	  return desc && desc.value;
	}

	function get$1(state, prop) {
	  if (prop === DRAFT_STATE) { return state; }
	  var drafts = state.drafts; // Check for existing draft in unmodified state.

	  if (!state.modified && has(drafts, prop)) {
	    return drafts[prop];
	  }

	  var value = source$1(state)[prop];

	  if (state.finalized || !isDraftable(value)) {
	    return value;
	  } // Check for existing draft in modified state.


	  if (state.modified) {
	    // Assigned values are never drafted. This catches any drafts we created, too.
	    if (value !== peek$1(state.base, prop)) { return value; } // Store drafts on the copy (when one exists).

	    drafts = state.copy;
	  }

	  return drafts[prop] = createProxy$1(value, state);
	}

	function set$1(state, prop, value) {
	  if (!state.modified) {
	    var baseValue = peek$1(state.base, prop); // Optimize based on value's truthiness. Truthy values are guaranteed to
	    // never be undefined, so we can avoid the `in` operator. Lastly, truthy
	    // values may be drafts, but falsy values are never drafts.

	    var isUnchanged = value ? is(baseValue, value) || value === state.drafts[prop] : is(baseValue, value) && prop in state.base;
	    if (isUnchanged) { return true; }
	    markChanged$1(state);
	  }

	  state.assigned[prop] = true;
	  state.copy[prop] = value;
	  return true;
	}

	function deleteProperty(state, prop) {
	  // The `undefined` check is a fast path for pre-existing keys.
	  if (peek$1(state.base, prop) !== undefined || prop in state.base) {
	    state.assigned[prop] = false;
	    markChanged$1(state);
	  } else if (state.assigned[prop]) {
	    // if an originally not assigned property was deleted
	    delete state.assigned[prop];
	  }

	  if (state.copy) { delete state.copy[prop]; }
	  return true;
	} // Note: We never coerce `desc.value` into an Immer draft, because we can't make
	// the same guarantee in ES5 mode.


	function getOwnPropertyDescriptor(state, prop) {
	  var owner = source$1(state);
	  var desc = Reflect.getOwnPropertyDescriptor(owner, prop);

	  if (desc) {
	    desc.writable = true;
	    desc.configurable = !Array.isArray(owner) || prop !== "length";
	  }

	  return desc;
	}

	function markChanged$1(state) {
	  if (!state.modified) {
	    state.modified = true;
	    state.copy = assign(shallowCopy(state.base), state.drafts);
	    state.drafts = null;
	    if (state.parent) { markChanged$1(state.parent); }
	  }
	}

	var modernProxy = /*#__PURE__*/Object.freeze({
		willFinalize: willFinalize$1,
		createProxy: createProxy$1
	});

	function generatePatches(state, basePath, patches, inversePatches) {
	  Array.isArray(state.base) ? generateArrayPatches(state, basePath, patches, inversePatches) : generateObjectPatches(state, basePath, patches, inversePatches);
	}

	function generateArrayPatches(state, basePath, patches, inversePatches) {
	  var assign, assign$1;

	  var base = state.base;
	  var copy = state.copy;
	  var assigned = state.assigned; // Reduce complexity by ensuring `base` is never longer.

	  if (copy.length < base.length) {
	    (assign = [copy, base], base = assign[0], copy = assign[1]);
	    (assign$1 = [inversePatches, patches], patches = assign$1[0], inversePatches = assign$1[1]);
	  }

	  var delta = copy.length - base.length; // Find the first replaced index.

	  var start = 0;

	  while (base[start] === copy[start] && start < base.length) {
	    ++start;
	  } // Find the last replaced index. Search from the end to optimize splice patches.


	  var end = base.length;

	  while (end > start && base[end - 1] === copy[end + delta - 1]) {
	    --end;
	  } // Process replaced indices.


	  for (var i = start; i < end; ++i) {
	    if (assigned[i] && copy[i] !== base[i]) {
	      var path = basePath.concat([i]);
	      patches.push({
	        op: "replace",
	        path: path,
	        value: copy[i]
	      });
	      inversePatches.push({
	        op: "replace",
	        path: path,
	        value: base[i]
	      });
	    }
	  }

	  var replaceCount = patches.length; // Process added indices.

	  for (var i$1 = end + delta - 1; i$1 >= end; --i$1) {
	    var path$1 = basePath.concat([i$1]);
	    patches[replaceCount + i$1 - end] = {
	      op: "add",
	      path: path$1,
	      value: copy[i$1]
	    };
	    inversePatches.push({
	      op: "remove",
	      path: path$1
	    });
	  }
	}

	function generateObjectPatches(state, basePath, patches, inversePatches) {
	  var base = state.base;
	  var copy = state.copy;
	  each(state.assigned, function (key, assignedValue) {
	    var origValue = base[key];
	    var value = copy[key];
	    var op = !assignedValue ? "remove" : key in base ? "replace" : "add";
	    if (origValue === value && op === "replace") { return; }
	    var path = basePath.concat(key);
	    patches.push(op === "remove" ? {
	      op: op,
	      path: path
	    } : {
	      op: op,
	      path: path,
	      value: value
	    });
	    inversePatches.push(op === "add" ? {
	      op: "remove",
	      path: path
	    } : op === "remove" ? {
	      op: "add",
	      path: path,
	      value: origValue
	    } : {
	      op: "replace",
	      path: path,
	      value: origValue
	    });
	  });
	}

	var applyPatches = function (draft, patches) {
	  for (var i$1 = 0, list = patches; i$1 < list.length; i$1 += 1) {
	    var patch = list[i$1];

	    var path = patch.path;
	    var op = patch.op;
	    var value = clone(patch.value); // used to clone patch to ensure original patch is not modified, see #411

	    if (!path.length) { throw new Error("Illegal state"); }
	    var base = draft;

	    for (var i = 0; i < path.length - 1; i++) {
	      base = base[path[i]];
	      if (!base || typeof base !== "object") { throw new Error("Cannot apply patch, path doesn't resolve: " + path.join("/")); } // prettier-ignore
	    }

	    var key = path[path.length - 1];

	    switch (op) {
	      case "replace":
	        // if value is an object, then it's assigned by reference
	        // in the following add or remove ops, the value field inside the patch will also be modifyed
	        // so we use value from the cloned patch
	        base[key] = value;
	        break;

	      case "add":
	        if (Array.isArray(base)) {
	          // TODO: support "foo/-" paths for appending to an array
	          base.splice(key, 0, value);
	        } else {
	          base[key] = value;
	        }

	        break;

	      case "remove":
	        if (Array.isArray(base)) {
	          base.splice(key, 1);
	        } else {
	          delete base[key];
	        }

	        break;

	      default:
	        throw new Error("Unsupported patch operation: " + op);
	    }
	  }

	  return draft;
	};

	function verifyMinified() {}

	var configDefaults = {
	  useProxies: typeof Proxy !== "undefined" && typeof Proxy.revocable !== "undefined" && typeof Reflect !== "undefined",
	  autoFreeze: typeof process !== "undefined" ? "production" !== "production" : verifyMinified.name === "verifyMinified",
	  onAssign: null,
	  onDelete: null,
	  onCopy: null
	};
	var Immer = function Immer(config) {
	  assign(this, configDefaults, config);
	  this.setUseProxies(this.useProxies);
	  this.produce = this.produce.bind(this);
	};

	Immer.prototype.produce = function produce (base, recipe, patchListener) {
	    var this$1 = this;

	  // curried invocation
	  if (typeof base === "function" && typeof recipe !== "function") {
	    var defaultBase = recipe;
	    recipe = base;
	    var self = this;
	    return function curriedProduce(base) {
	        var this$1 = this;
	        if ( base === void 0 ) base = defaultBase;
	        var args = [], len = arguments.length - 1;
	        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

	      return self.produce(base, function (draft) { return recipe.call.apply(recipe, [ this$1, draft ].concat( args )); }); // prettier-ignore
	    };
	  } // prettier-ignore


	  {
	    if (typeof recipe !== "function") {
	      throw new Error("The first or second argument to `produce` must be a function");
	    }

	    if (patchListener !== undefined && typeof patchListener !== "function") {
	      throw new Error("The third argument to `produce` must be a function or undefined");
	    }
	  }
	  var result; // Only plain objects, arrays, and "immerable classes" are drafted.

	  if (isDraftable(base)) {
	    var scope = ImmerScope.enter();
	    var proxy = this.createProxy(base);
	    var hasError = true;

	    try {
	      result = recipe(proxy);
	      hasError = false;
	    } finally {
	      // finally instead of catch + rethrow better preserves original stack
	      if (hasError) { scope.revoke(); }else { scope.leave(); }
	    }

	    if (result instanceof Promise) {
	      return result.then(function (result) {
	        scope.usePatches(patchListener);
	        return this$1.processResult(result, scope);
	      }, function (error) {
	        scope.revoke();
	        throw error;
	      });
	    }

	    scope.usePatches(patchListener);
	    return this.processResult(result, scope);
	  } else {
	    result = recipe(base);
	    if (result === NOTHING) { return undefined; }
	    if (result === undefined) { result = base; }
	    this.maybeFreeze(result, true);
	    return result;
	  }
	};

	Immer.prototype.produceWithPatches = function produceWithPatches (arg1, arg2, arg3) {
	    var this$1 = this;

	  if (typeof arg1 === "function") {
	    return function (state) {
	        var args = [], len = arguments.length - 1;
	        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

	        return this$1.produceWithPatches(state, function (draft) { return arg1.apply(void 0, [ draft ].concat( args )); });
	      };
	  } // non-curried form


	  if (arg3) { throw new Error("A patch listener cannot be passed to produceWithPatches"); }
	  var patches, inversePatches;
	  var nextState = this.produce(arg1, arg2, function (p, ip) {
	    patches = p;
	    inversePatches = ip;
	  });
	  return [nextState, patches, inversePatches];
	};

	Immer.prototype.createDraft = function createDraft (base) {
	  if (!isDraftable(base)) {
	    throw new Error("First argument to `createDraft` must be a plain object, an array, or an immerable object"); // prettier-ignore
	  }

	  var scope = ImmerScope.enter();
	  var proxy = this.createProxy(base);
	  proxy[DRAFT_STATE].isManual = true;
	  scope.leave();
	  return proxy;
	};

	Immer.prototype.finishDraft = function finishDraft (draft, patchListener) {
	  var state = draft && draft[DRAFT_STATE];

	  if (!state || !state.isManual) {
	    throw new Error("First argument to `finishDraft` must be a draft returned by `createDraft`"); // prettier-ignore
	  }

	  if (state.finalized) {
	    throw new Error("The given draft is already finalized"); // prettier-ignore
	  }

	  var scope = state.scope;
	  scope.usePatches(patchListener);
	  return this.processResult(undefined, scope);
	};

	Immer.prototype.setAutoFreeze = function setAutoFreeze (value) {
	  this.autoFreeze = value;
	};

	Immer.prototype.setUseProxies = function setUseProxies (value) {
	  this.useProxies = value;
	  assign(this, value ? modernProxy : legacyProxy);
	};

	Immer.prototype.applyPatches = function applyPatches$1 (base, patches) {
	  // If a patch replaces the entire state, take that replacement as base
	  // before applying patches
	  var i;

	  for (i = patches.length - 1; i >= 0; i--) {
	    var patch = patches[i];

	    if (patch.path.length === 0 && patch.op === "replace") {
	      base = patch.value;
	      break;
	    }
	  }

	  if (isDraft(base)) {
	    // N.B: never hits if some patch a replacement, patches are never drafts
	    return applyPatches(base, patches);
	  } // Otherwise, produce a copy of the base state.


	  return this.produce(base, function (draft) { return applyPatches(draft, patches.slice(i + 1)); });
	};
	/** @internal */


	Immer.prototype.processResult = function processResult (result, scope) {
	  var baseDraft = scope.drafts[0];
	  var isReplaced = result !== undefined && result !== baseDraft;
	  this.willFinalize(scope, result, isReplaced);

	  if (isReplaced) {
	    if (baseDraft[DRAFT_STATE].modified) {
	      scope.revoke();
	      throw new Error("An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft."); // prettier-ignore
	    }

	    if (isDraftable(result)) {
	      // Finalize the result in case it contains (or is) a subset of the draft.
	      result = this.finalize(result, null, scope);
	      this.maybeFreeze(result);
	    }

	    if (scope.patches) {
	      scope.patches.push({
	        op: "replace",
	        path: [],
	        value: result
	      });
	      scope.inversePatches.push({
	        op: "replace",
	        path: [],
	        value: baseDraft[DRAFT_STATE].base
	      });
	    }
	  } else {
	    // Finalize the base draft.
	    result = this.finalize(baseDraft, [], scope);
	  }

	  scope.revoke();

	  if (scope.patches) {
	    scope.patchListener(scope.patches, scope.inversePatches);
	  }

	  return result !== NOTHING ? result : undefined;
	};
	/**
	 * @internal
	 * Finalize a draft, returning either the unmodified base state or a modified
	 * copy of the base state.
	 */


	Immer.prototype.finalize = function finalize (draft, path, scope) {
	    var this$1 = this;

	  var state = draft[DRAFT_STATE];

	  if (!state) {
	    if (Object.isFrozen(draft)) { return draft; }
	    return this.finalizeTree(draft, null, scope);
	  } // Never finalize drafts owned by another scope.


	  if (state.scope !== scope) {
	    return draft;
	  }

	  if (!state.modified) {
	    this.maybeFreeze(state.base, true);
	    return state.base;
	  }

	  if (!state.finalized) {
	    state.finalized = true;
	    this.finalizeTree(state.draft, path, scope);

	    if (this.onDelete) {
	      // The `assigned` object is unreliable with ES5 drafts.
	      if (this.useProxies) {
	        var assigned = state.assigned;

	        for (var prop in assigned) {
	          if (!assigned[prop]) { this.onDelete(state, prop); }
	        }
	      } else {
	        var base = state.base;
	          var copy = state.copy;
	        each(base, function (prop) {
	          if (!has(copy, prop)) { this$1.onDelete(state, prop); }
	        });
	      }
	    }

	    if (this.onCopy) {
	      this.onCopy(state);
	    } // At this point, all descendants of `state.copy` have been finalized,
	    // so we can be sure that `scope.canAutoFreeze` is accurate.


	    if (this.autoFreeze && scope.canAutoFreeze) {
	      Object.freeze(state.copy);
	    }

	    if (path && scope.patches) {
	      generatePatches(state, path, scope.patches, scope.inversePatches);
	    }
	  }

	  return state.copy;
	};
	/**
	 * @internal
	 * Finalize all drafts in the given state tree.
	 */


	Immer.prototype.finalizeTree = function finalizeTree (root, rootPath, scope) {
	    var this$1 = this;

	  var state = root[DRAFT_STATE];

	  if (state) {
	    if (!this.useProxies) {
	      // Create the final copy, with added keys and without deleted keys.
	      state.copy = shallowCopy(state.draft, true);
	    }

	    root = state.copy;
	  }

	  var needPatches = !!rootPath && !!scope.patches;

	  var finalizeProperty = function (prop, value, parent) {
	    if (value === parent) {
	      throw Error("Immer forbids circular references");
	    } // In the `finalizeTree` method, only the `root` object may be a draft.


	    var isDraftProp = !!state && parent === root;

	    if (isDraft(value)) {
	      var path = isDraftProp && needPatches && !state.assigned[prop] ? rootPath.concat(prop) : null; // Drafts owned by `scope` are finalized here.

	      value = this$1.finalize(value, path, scope); // Drafts from another scope must prevent auto-freezing.

	      if (isDraft(value)) {
	        scope.canAutoFreeze = false;
	      } // Preserve non-enumerable properties.


	      if (Array.isArray(parent) || isEnumerable(parent, prop)) {
	        parent[prop] = value;
	      } else {
	        Object.defineProperty(parent, prop, {
	          value: value
	        });
	      } // Unchanged drafts are never passed to the `onAssign` hook.


	      if (isDraftProp && value === state.base[prop]) { return; }
	    } // Unchanged draft properties are ignored.
	    else if (isDraftProp && is(value, state.base[prop])) {
	        return;
	      } // Search new objects for unfinalized drafts. Frozen objects should never contain drafts.
	      else if (isDraftable(value) && !Object.isFrozen(value)) {
	          each(value, finalizeProperty);
	          this$1.maybeFreeze(value);
	        }

	    if (isDraftProp && this$1.onAssign) {
	      this$1.onAssign(state, prop, value);
	    }
	  };

	  each(root, finalizeProperty);
	  return root;
	};

	Immer.prototype.maybeFreeze = function maybeFreeze (value, deep) {
	    if ( deep === void 0 ) deep = false;

	  if (this.autoFreeze && !isDraft(value)) {
	    if (deep) { deepFreeze(value); }else { Object.freeze(value); }
	  }
	};

	var immer = new Immer();
	/**
	 * The `produce` function takes a value and a "recipe function" (whose
	 * return value often depends on the base state). The recipe function is
	 * free to mutate its first argument however it wants. All mutations are
	 * only ever applied to a __copy__ of the base state.
	 *
	 * Pass only a function to create a "curried producer" which relieves you
	 * from passing the recipe function every time.
	 *
	 * Only plain objects and arrays are made mutable. All other objects are
	 * considered uncopyable.
	 *
	 * Note: This function is __bound__ to its `Immer` instance.
	 *
	 * @param {any} base - the initial state
	 * @param {Function} producer - function that receives a proxy of the base state as first argument and which can be freely modified
	 * @param {Function} patchListener - optional function that will be called with all the patches produced here
	 * @returns {any} a new state, or the initial state if nothing was modified
	 */

	var produce = immer.produce;
	/**
	 * Like `produce`, but `produceWithPatches` always returns a tuple
	 * [nextState, patches, inversePatches] (instead of just the next state)
	 */

	var produceWithPatches = immer.produceWithPatches.bind(immer);
	/**
	 * Pass true to automatically freeze all copies created by Immer.
	 *
	 * By default, auto-freezing is disabled in production.
	 */

	var setAutoFreeze = immer.setAutoFreeze.bind(immer);
	/**
	 * Pass true to use the ES2015 `Proxy` class when creating drafts, which is
	 * always faster than using ES5 proxies.
	 *
	 * By default, feature detection is used, so calling this is rarely necessary.
	 */

	var setUseProxies = immer.setUseProxies.bind(immer);
	/**
	 * Apply an array of Immer patches to the first argument.
	 *
	 * This function is a producer, which means copy-on-write is in effect.
	 */

	var applyPatches$1 = immer.applyPatches.bind(immer);
	/**
	 * Create an Immer draft from the given base state, which may be a draft itself.
	 * The draft can be modified until you finalize it with the `finishDraft` function.
	 */

	var createDraft = immer.createDraft.bind(immer);
	/**
	 * Finalize an Immer draft from a `createDraft` call, returning the base state
	 * (if no changes were made) or a modified copy. The draft must *not* be
	 * mutated afterwards.
	 *
	 * Pass a function as the 2nd argument to generate Immer patches based on the
	 * changes that were made.
	 */

	var finishDraft = immer.finishDraft.bind(immer);
	//# sourceMappingURL=immer.module.js.map

	function symbolObservablePonyfill(root) {
		var result;
		var Symbol = root.Symbol;

		if (typeof Symbol === 'function') {
			if (Symbol.observable) {
				result = Symbol.observable;
			} else {
				result = Symbol('observable');
				Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	}

	/* global window */

	var root;

	if (typeof self !== 'undefined') {
	  root = self;
	} else if (typeof window !== 'undefined') {
	  root = window;
	} else if (typeof global !== 'undefined') {
	  root = global;
	} else if (typeof module !== 'undefined') {
	  root = module;
	} else {
	  root = Function('return this')();
	}

	var result = symbolObservablePonyfill(root);

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var randomString = function randomString() {
	  return Math.random().toString(36).substring(7).split('').join('.');
	};

	var ActionTypes = {
	  INIT: "@@redux/INIT" + randomString(),
	  REPLACE: "@@redux/REPLACE" + randomString(),
	  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
	    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
	  }
	};

	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */
	function isPlainObject$1(obj) {
	  if (typeof obj !== 'object' || obj === null) return false;
	  var proto = obj;

	  while (Object.getPrototypeOf(proto) !== null) {
	    proto = Object.getPrototypeOf(proto);
	  }

	  return Object.getPrototypeOf(obj) === proto;
	}

	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [preloadedState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */

	function createStore(reducer, preloadedState, enhancer) {
	  var _ref2;

	  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
	    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function.');
	  }

	  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = preloadedState;
	    preloadedState = undefined;
	  }

	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }

	    return enhancer(createStore)(reducer, preloadedState);
	  }

	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = preloadedState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;
	  /**
	   * This makes a shallow copy of currentListeners so we can use
	   * nextListeners as a temporary list while dispatching.
	   *
	   * This prevents any bugs around consumers calling
	   * subscribe/unsubscribe in the middle of a dispatch.
	   */

	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }
	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */


	  function getState() {
	    if (isDispatching) {
	      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
	    }

	    return currentState;
	  }
	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */


	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected the listener to be a function.');
	    }

	    if (isDispatching) {
	      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
	    }

	    var isSubscribed = true;
	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);
	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      if (isDispatching) {
	        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
	      }

	      isSubscribed = false;
	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }
	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */


	  function dispatch(action) {
	    if (!isPlainObject$1(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    var listeners = currentListeners = nextListeners;

	    for (var i = 0; i < listeners.length; i++) {
	      var listener = listeners[i];
	      listener();
	    }

	    return action;
	  }
	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */


	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }

	    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
	    // Any reducers that existed in both the new and old rootReducer
	    // will receive the previous state. This effectively populates
	    // the new state tree with any relevant data from the old one.

	    dispatch({
	      type: ActionTypes.REPLACE
	    });
	  }
	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/tc39/proposal-observable
	   */


	  function observable() {
	    var _ref;

	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */
	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object' || observer === null) {
	          throw new TypeError('Expected the observer to be an object.');
	        }

	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }

	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return {
	          unsubscribe: unsubscribe
	        };
	      }
	    }, _ref[result] = function () {
	      return this;
	    }, _ref;
	  } // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.


	  dispatch({
	    type: ActionTypes.INIT
	  });
	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[result] = observable, _ref2;
	}

	const PLAYER_JOINED = 'PLAYER_JOINED';
	const PLAYER_LEFT = 'PLAYER_LEFT';
	const ADD_DRINKS = 'ADD_DRINKS';

	function playerJoined(name, id) {
	    return { type: PLAYER_JOINED, name, id }
	}

	function playerLeft(name) {
	    return { type: PLAYER_LEFT, name }
	}

	function addDrinks(name, amount) {
	    return { type: ADD_DRINKS, name, amount }
	}

	const reducer = produce((draft, action) => {
	    switch (action.type) {
	        case PLAYER_JOINED:
	            draft[action.name] = { drinks: 0, id: action.id };
	            break

	        case PLAYER_LEFT:
	            delete draft[action.name];
	            break

	        case ADD_DRINKS:
	            draft[action.name].drinks += action.amount;
	            break
	    }
	});

	function createStore$1(initialState) {
	    return createStore(reducer, initialState)
	}

	let store;

	function updateState(node) {
	    const event = parse(node);

	    switch (event.type) {
	        case 'GUESS':
	            store.dispatch(addDrinks(event.name, 1));
	            break

	        case 'JOINED':
	            const player = findPlayer(event.name);
	            if (!!player) {
	                store.dispatch(playerJoined(player.name, player.id));
	            }
	            break

	        case 'LEFT':
	            store.dispatch(playerLeft(event.name));
	            break
	    }
	}

	const screenGame = qwery('#screenGame')[0];
	new MutationObserver(() => {
	    if (bonzo(screenGame).css('display') == 'none') return

	    const initialState = {};
	    for (const player of getPlayers()) {
	        initialState[player.name] = { drinks: 0, id: player.id };
	    }

	    store = createStore$1(initialState);

	    store.subscribe(() => {
	        const state = store.getState();

	        for (const name in state) {
	            const { drinks, id } = state[name];

	            const elem = qwery('#' + id)[0];
	            const infoElem = elem.children[1];
	            let guessesElem = infoElem.children[2];
	            if (guessesElem === undefined) {
	                guessesElem = document.createElement('div');
	                guessesElem.style['font-size'] = '200%';
	                infoElem.appendChild(guessesElem);
	            }
	            guessesElem.textContent = '🍺 ' + drinks;
	        }
	    });

	    const boxMessages = qwery('#boxMessages')[0];
	    new MutationObserver(function(mutationsList) {
	        for (let mutation of mutationsList) {
	            if (mutation.type === 'childList') {
	                for (let node of mutation.addedNodes) {
	                    if (node.tagName.toLowerCase() == 'p') {
	                        updateState(node);
	                    }
	                }
	            }
	        }
	    }).observe(boxMessages, { childList: true });
	}).observe(screenGame, { attributes: true });

}());
