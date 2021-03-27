/*!
 * LibraryTemplate JavaScript Library v2.4.0
 * https://github.com/AntimatterX/antimatterx.github.io/blob/main/assets/lib/librarytemplate/librarytemplate.js
 * 
 * Copyright (c) 2021 AntimatterX
 * 
 * Released under the MIT license.
 * see https://opensource.org/licenses/MIT
 * 
 * This library is declared globally in non-Node.js environments with the following name.
 * librarytemplate
 * 
 * Last Update: 2021-03-27T04:46:56.456Z
 */
(function _main(_root, undefined) {
    'use strict';
    // 環境
    var _ctx = {
        libKey: [],
        conflict: {},
        fn: {
            /**
             * グローバルのライブラリのプロパティを読み込み前に戻します。
             * @returns {Object<string, ?*>} 読み込み前のプロパティのリストをオブジェクトで返します。
             * @example
             * ObjectWithThisMethod.noConflict();
             */
            noConflict: function () {
                for (var i = 0; i < _ctx.libKey.length; i++) {
                    var key = _ctx.libKey[i];
                    if (key in _ctx.conflict) _root[key] = _ctx.conflict[key];
                }
                return _ctx.conflict;
            },
            /**
             * 型名を返します。
             * @param {?*} [x=undefined] 型名を取得する値を渡します。
             * @returns {string} 第一引数に渡した値の型名の文字列を返します。
             * @example
             * // 'Array'
             * ObjectWithThisMethod.getType([]);
             */
            getType: function (x) {
                return Object.prototype.toString.call(x).slice(8, -1);
            },
            /**
             * 指定した型名か判定します。
             * @param {?*} x 判定する値を渡します。
             * @param {string|RegExp|Array<string>} typeName 型名の文字列か、型名にマッチする正規表現か、型名の配列を渡します。
             * @returns {boolean} 第一引数に渡した値の型名が第二引数に渡された型名か判定して真偽値で返します。
             * @example
             * // true
             * ObjectWithThisMethod.isType('Hello, World!', 'String');
             * ObjectWithThisMethod.isType(document.body, /Element$/);
             * ObjectWithThisMethod.isType('Hello, World!', [ 'String', 'Number' ]);
             * ObjectWithThisMethod.isType(12345, [ 'String', 'Number' ]);
             */
            isType: function (x, typeName) {
                var xType = _ctx.fn.getType(x);
                switch (_ctx.fn.getType(typeName)) {
                    case 'String':
                        return xType === typeName;
                    case 'RegExp':
                        return typeName.test(xType);
                    case 'Array':
                        return typeName.indexOf(xType) > -1;
                    default:
                        return false;
                }
            },
            /**
             * デフォルト値の型にキャストします。
             * @param {?*} x キャストする値を渡します。
             * @param {?*} defaultValue デフォルトの値を渡します。
             * @param {string|RegExp|Array<string>} [allowType=[]] デフォルト値の型以外にも許容する
             *     型の型名の文字列か、型名にマッチする正規表現か、型名の配列を渡します。
             * @returns {?*} デフォルト値の型にキャストされた値を返します。
             * @example
             * // 12345
             * ObjectWithThisMethod.castType('Hello, World!', 12345);
             * 
             * // 'Hello, World!'
             * ObjectWithThisMethod.castType('Hello, World!', 12345, 'String');
             */
            castType: function (x, defaultValue, allowType) {
                return _ctx.fn.isType(x, _ctx.fn.isType(allowType, 'RegExp') ? allowType :
                    [_ctx.fn.getType(defaultValue)].concat(
                        _ctx.fn.isType(allowType, 'Array') ? allowType :
                            typeof allowType === 'string' ? [allowType] :
                                []
                    )) ? x : defaultValue;
            },
            /**
             * オブジェクトのプロパティをデフォルト値のオブジェクトのプロパティの型にキャストします。
             * @param {Object<string, ?*>} param キャストするオブジェクトを渡します。
             * @param {Object<string, ?*>} defaultParam デフォルト値のオブジェクトを渡します。
             * @param {string|RegExp|Array<string>|Object<string, string|RegExp|Array<string>>} [allowTypeList={}] デフォルト値のオブジェクトのプロパティの型以外にも許容する
             *     型名の文字列か、型名にマッチする正規表現または型名の配列とデフォルト値のプロパティ名が組のオブジェクトを渡します。
             * @returns {Object<string. ?*>} デフォルト値の型にキャストされたオブジェクトを返します。
             * @example
             * // { foo: 12345, bar: 'Hello, World!', foobar: 'foobar' }
             * ObjectWithThisMethod.castParam({ foo: 12345, bar: 'Hello, World!', foobar: null }, { foo: 0, bar: '', foobar: 'foobar' });
             */
            castParam: function (param, defaultParam, allowTypeList) {
                param = _ctx.fn.castType(param, {});
                defaultParam = _ctx.fn.castType(defaultParam, {});
                var defaultParamKeys = Object.keys(defaultParam);
                allowTypeList = (function () {
                    switch (_ctx.fn.getType(allowTypeList)) {
                        case 'String':
                        case 'RegExp':
                        case 'Array':
                            var obj = {};
                            for (var i = 0; i < defaultParamKeys.length; i++) obj[defaultParamKeys[i]] = allowTypeList;
                            return obj;
                        default:
                            return allowTypeList;
                    }
                })();
                var clone = (function () {
                    var obj = {},
                        propKeys = Object.keys(param);
                    for (var i = 0; i < propKeys.length; i++)obj[propKeys[i]] = param[propKeys[i]];
                    return obj;
                })();
                for (var i = 0; i < defaultParamKeys.length; i++) {
                    var key = defaultParamKeys[i];
                    clone[key] = !(key in param) ? defaultParam[key] :
                        _ctx.fn.castType(
                            param[key], defaultParam[key],
                            _ctx.fn.castType(allowTypeList[key], [], ['String', 'RegExp'])
                        );
                }
                return clone;
            }
        }
    };


    // ライブラリ
    var _lib = {
        key: 'librarytemplate', // 文字列か文字列の配列のグローバルでのライブラリのキー
        val: { // エクスポートされるライブラリの値
            _root: _root,
            'undefined': undefined,
            _main: _main,
            _ctx: _ctx,
            _lib: _lib
        }
    };

    // エクスポート
    _ctx.libKey = _ctx.fn.castType(_lib.key, [_lib.key]);
    if (typeof module === 'object' &&
        typeof module.exports === 'object' && module.exports !== null) module.exports = _lib.val;
    else {
        for (var i = 0; i < _ctx.libKey.length; i++) {
            var k = _ctx.libKey[i];
            if (k in _root) _ctx.conflict[k] = _root[k];
            _root[k] = _lib.val;
        }
    }

    // ローカル変数をオブジェクトで返す
    return {
        _root: _root,
        'undefined': undefined,
        _main: _main,
        _ctx: _ctx,
        _lib: _lib
    };
})(typeof window === 'object' ? window : this);
