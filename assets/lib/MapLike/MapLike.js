/*!
 * LibraryTemplate JavaScript Library v1.0.0
 * https://github.com/AntimatterX/antimatterx.github.io/blob/main/assets/lib/MapLike/MapLike.js
 * 
 * Copyright (c) 2021 AntimatterX
 * 
 * Released under the MIT license.
 * see https://opensource.org/licenses/MIT
 * 
 * This library is declared globally in non-Node.js environments with the following name.
 * MapLike
 * 
 * Last Update: 2021-03-12T15:51:04.207Z
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
            'MapLike'
        ],
        value: (function () {
            function MapLike(entries) {
                if (!(this instanceof MapLike)) return new MapLike();
                this._mapEntries = [];
                var that = this;
                if (Array.isArray(entries)) entries.forEach(function (entry) {
                    if (Array.isArray(entry)) that.set(entry[0], entry[1]);
                });
            }

            var p = MapLike.prototype;
            Object.defineProperty(p, 'size', {
                get: function () {
                    return this._mapEntries.length;
                }
            });
            p._getIdx = function (key) {
                var i = 0,
                    entryKeys = this._mapEntries.map(function (entry) {
                        return entry[0];
                    });
                if (isNaN(key) && typeof key === 'number') {
                    while (!isNaN(entryKeys[i]) ||
                        typeof entryKeys[i] !== 'number') i++;
                } else i = entryKeys.indexOf(key);
                return i;
            };
            p.clear = function () {
                while (this.size > 0) this._mapEntries.pop();
            };
            p.delete = function (key) {
                if (!this.has(key)) return false;
                this._mapEntries.splice(this._getIdx(key), 1);
                return true;
            };
            p.get = function (key) {
                if (this.has(key)) return this._mapEntries[this._getIdx(key)][1];
            };
            p.has = function (key) {
                var entryKeys = this._mapEntries.map(function (entry) {
                    return entry[0];
                });
                return isNaN(key) && typeof key === 'number' ? entryKeys.some(function (k) {
                    return isNaN(k) && typeof k === 'number';
                }) : entryKeys.indexOf(key) > -1;
            };
            p.set = function (key, value) {
                if (this.has(key)) this._mapEntries[this._getIdx(key)][1] = value;
                else this._mapEntries.push([key, value]);
                return this;
            };
            p.forEach = function (callback, thisArg) {
                var that = this;
                this._mapEntries.forEach(function (entry, i) {
                    callback.call(thisArg, entry[1], i, that);
                });
            };

            return MapLike;
        })()
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