/*!
 * LibraryTemplate JavaScript Library v2.2.0
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
 * Last Update: 2021-03-05T16:03:12.310Z
 */
(function _main(_root, undefined) {
    'use strict';
    // 環境
    var _ctx = {
        libKeys: [],
        conflicts: {},
        fn: {
            /**
             * グローバルのライブラリのプロパティを読み込み前に戻します。
             * @returns {Object<string, ?*>} 読み込み前のプロパティのリストをオブジェクトで返します。
             */
            noConflict: function () {
                _ctx.libKeys.forEach(function (k) {
                    if (k in _ctx.conflicts) _root[k] = _ctx.conflicts[k];
                });
                return _ctx.conflict;
            },
            /**
             * 型名を返します。
             * @param {?*} [x=undefined] 型名を取得する値を渡します。
             * @returns {string} 第一引数に渡した値の型名の文字列を返します。
             */
            getType: function (x) {
                return Object.prototype.toString.call(x).slice(8, -1);
            },
            /**
             * 指定した型名か判定します。
             * @param {?*} x 判定する値を渡します。
             * @param {string|Array<string>} type 型名の文字列または型名の配列を渡します。
             * @returns {boolean} 第一引数に渡した値の型名が第二引数に渡された型名か判定して真偽値で返します。
             */
            isType: function (x, type) {
                var xType = _ctx.fn.getType(x);
                switch (_ctx.fn.getType(type)) {
                    case 'String':
                        return xType === type;
                    case 'Array':
                        return type.indexOf(xType) > -1;
                    default:
                        return false;
                }
            },
            /**
             * デフォルト値の型にキャストします。
             * @param {?*} x キャストする値を渡します。
             * @param {?*} defaultValue デフォルトの値を渡します。
             * @param {string|Array<string>} [allowType=[]] デフォルト値の型以外にも許容する型の型名の文字列または型名の配列を渡します。
             * @returns {?*} デフォルト値の型にキャストされた値を返します。
             */
            castType: function (x, defaultValue, allowType) {
                return _ctx.fn.isType(x, [_ctx.fn.getType(defaultValue)].concat(Array.isArray(allowType) ? allowType :
                    typeof allowType === 'string' ? [allowType] : [])) ? x : defaultValue;
            },
            /**
             * オブジェクトのプロパティをデフォルト値のプロパティの型にキャストします。
             * @param {Object<string, ?*>|Array<?*>} param キャストするオブジェクトを渡します。
             * @param {Object<string, ?*>|Array<?*>} defaultParam デフォルト値のオブジェクトを渡します。
             * @param {Array<string|Array<string>>} [allowTypes=[]] デフォルト値のオブジェクトと同じ長さのデフォルト値のプロパティの型以外にも許容する型の型名の文字列または型名の配列を含む配列を渡します。
             * @returns {Object<string, ?*>} デフォルト値の型にキャストされたオブジェクトを返します。
             */
            castParam: function (param, defaultParam, allowTypes) {
                param = _ctx.fn.castType(param, {});
                defaultParam = _ctx.fn.castType(defaultParam, {});
                allowTypes = _ctx.fn.castType(allowTypes, []).slice();
                var clone = (function () {
                    var obj = {};
                    Object.keys(param).forEach(function (k) {
                        obj[k] = param[k];
                    });
                    return obj;
                })();
                Object.keys(defaultParam).forEach(function (k, i) {
                    if (!(k in clone)) clone[k] = defaultParam[k];
                    else clone[k] = _ctx.fn.castType(clone[k], defaultParam[k], _ctx.fn.castType(allowTypes[i], [], 'String'));
                });
                return clone;
            }
        }
    };

    // ライブラリ
    var _lib = {
        keys: [ // グローバルでのライブラリのキー
            'librarytemplate'
        ],
        value: { // ライブラリの値
            foo: 'bar',
            hoge: 'fuga'
        }
    };

    // エクスポート
    _ctx.libKeys = _lib.keys;
    if (typeof module === 'object' && module.exports !== undefined) _lib.value;
    else _lib.keys.forEach(function (k) {
        if (k in _root) _ctx.conflicts[k] = _root[k];
        _root[k] = _lib.value;
    });

    // ローカル変数をオブジェクトで返す
    return {
        _root: _root,
        'undefined': undefined,
        _main: _main,
        _ctx: _ctx,
        _lib: _lib
    };
})(typeof window === 'object' ? window : this);