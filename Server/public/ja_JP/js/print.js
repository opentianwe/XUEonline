(function ($) {
    "use strict";
    function getjQueryObject(string) {
        var jqObj = $("");
        try {
            jqObj = $(string).clone();
        } catch (e) {
            jqObj = $("<span />").html(string);
        }
        return jqObj;
    }
    function printFrame(frameWindow) {
        var def = $.Deferred();
        try {
            setTimeout(function () {
                frameWindow.focus();
                try {
                    if (!frameWindow.document.execCommand("print", false, null)) {
                        frameWindow.print();
                    }
                } catch (e) {
                    frameWindow.print();
                }
                frameWindow.close();
                def.resolve();
            }, 250);
        } catch (err) {
            def.reject(err);
        }
        return def;
    }
    function printContentInNewWindow(content) {
        var w = window.open();
        w.document.write(content);
        w.document.close();
        return printFrame(w);
    }
    function isNode(o) {
        return !!(typeof Node === "object"
            ? o instanceof Node
            : o &&
            typeof o === "object" &&
            typeof o.nodeType === "number" &&
            typeof o.nodeName === "string");
    }
    $.print = $.fn.print = function () {
        var options,
            $this,
            self = this;
        if (self instanceof $) {
            self = self.get(0);
        }
        if (isNode(self)) {
            $this = $(self);
            if (arguments.length > 0) {
                options = arguments[0];
            }
        } else {
            if (arguments.length > 0) {
                $this = $(arguments[0]);
                if (isNode($this[0])) {
                    if (arguments.length > 1) {
                        options = arguments[1];
                    }
                } else {
                    options = arguments[0];
                    $this = $("html");
                }
            } else {
                $this = $("html");
            }
        }
        var defaults = {
            globalStyles: true,
            mediaPrint: false,
            stylesheet: null,
            noPrintSelector: ".no-print",
            iframe: true,
            append: null,
            prepend: null,
            manuallyCopyFormValues: true,
            deferred: $.Deferred(),
        };
        options = $.extend({}, defaults, options || {});
        var $styles = $("");
        if (options.globalStyles) {
            $styles = $("style, link, meta, title");
        } else if (options.mediaPrint) {
            $styles = $("link[media=print]");
        }
        if (options.stylesheet) {
            $styles = $.merge(
                $styles,
                $('<link rel="stylesheet" href="' + options.stylesheet + '">')
            );
        }
        var copy = $this.clone();
        copy = $("<span/>").append(copy);
        copy.find(options.noPrintSelector).remove();
        copy.append($styles.clone());
        copy.append(getjQueryObject(options.append));
        copy.prepend(getjQueryObject(options.prepend));
        if (options.manuallyCopyFormValues) {
            copy.find("input").each(function () {
                var $field = $(this);
                if ($field.is("[type='radio']") || $field.is("[type='checkbox']")) {
                    if ($field.prop("checked")) {
                        $field.attr("checked", "checked");
                    }
                } else {
                    $field.attr("value", $field.val());
                }
            });
            copy.find("select").each(function () {
                var $field = $(this);
                $field.find(":selected").attr("selected", "selected");
            });
            copy.find("textarea").each(function () {
                var $field = $(this);
                $field.text($field.val());
            });
        }
        var content = copy.html();
        try {
            options.deferred.notify("generated_markup", content, copy);
        } catch (err) {
            console.warn("Error notifying deferred", err);
        }
        copy.remove();
        if (options.iframe) {
            try {
                var $iframe = $(options.iframe + "");
                var iframeCount = $iframe.length;
                if (iframeCount === 0) {
                    $iframe = $(
                        '<iframe height="0" width="0" border="0" wmode="Opaque"/>'
                    )
                        .prependTo("body")
                        .css({ position: "absolute", top: -999, left: -999 });
                }
                var w, wdoc;
                w = $iframe.get(0);
                w = w.contentWindow || w.contentDocument || w;
                wdoc = w.document || w.contentDocument || w;
                wdoc.open();
                wdoc.write(content);
                wdoc.close();
                printFrame(w)
                    .done(function () {
                        setTimeout(function () {
                            if (iframeCount === 0) {
                                $iframe.remove();
                            }
                        }, 100);
                    })
                    .fail(function (err) {
                        console.error("Failed to print from iframe", err);
                        printContentInNewWindow(content);
                    })
                    .always(function () {
                        try {
                            options.deferred.resolve();
                        } catch (err) {
                            console.warn("Error notifying deferred", err);
                        }
                    });
            } catch (e) {
                console.error("Failed to print from iframe", e.stack, e.message);
                printContentInNewWindow(content).always(function () {
                    try {
                        options.deferred.resolve();
                    } catch (err) {
                        console.warn("Error notifying deferred", err);
                    }
                });
            }
        } else {
            printContentInNewWindow(content).always(function () {
                try {
                    options.deferred.resolve();
                } catch (err) {
                    console.warn("Error notifying deferred", err);
                }
            });
        }
        return this;
    };
})(jQuery);
