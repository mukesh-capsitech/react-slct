(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.target = "browser";
FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("index.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_decorators_1 = require("lodash-decorators");
const React = require("react");
const styled_components_1 = require("styled-components");
const value_1 = require("./value");
const menu_1 = require("./menu");
exports.Menu = menu_1.Menu;
const menu_container_1 = require("./menu-container");
const utils_1 = require("./utils");
exports.keys = utils_1.keys;
const typings_1 = require("./typings");
exports.SelectProps = typings_1.SelectProps;
exports.MenuComponentProps = typings_1.MenuComponentProps;
exports.LabelComponentProps = typings_1.LabelComponentProps;
exports.Option = typings_1.Option;
require("./global-stylings");
var option_1 = require("./option");
exports.OptionComponent = option_1.OptionComponent;
var value_component_single_1 = require("./value-component-single");
exports.ValueComponentSingle = value_component_single_1.ValueComponentSingle;
var value_component_multi_1 = require("./value-component-multi");
exports.ValueComponentMulti = value_component_multi_1.ValueComponentMulti;
var typings_2 = require("./typings");
exports.OptionComponentProps = typings_2.OptionComponentProps;
exports.ValueComponentSingleProps = typings_2.ValueComponentSingleProps;
exports.ValueComponentMultiProps = typings_2.ValueComponentMultiProps;
class Select extends React.PureComponent {
    constructor(props) {
        super(props);
        this.container = null;
        this.nativeSelect = React.createRef();
        this.state = {
            open: false,
            blindText: ''
        };
    }
    get options() {
        const { search } = this.state;
        const { creatable, onCreateText } = this.props;
        let options = this.props.options || [];
        const showCreate = creatable &&
            !options.some(option => {
                const { value, label } = option;
                // @ts-ignore
                return value === search || label === search;
            });
        if (search) {
            options = options.filter(option => option.label.toLowerCase().includes(search.toLowerCase()));
        }
        if (showCreate && search) {
            options = [
                {
                    label: onCreateText
                        ? onCreateText(search)
                        : `Create "${search}"`,
                    value: search,
                    creatable: true
                },
                ...options
            ];
        }
        return options;
    }
    get document() {
        return utils_1.getDocument();
    }
    optionIsCreatable(option) {
        return (this.props.creatable &&
            option.creatable &&
            Boolean(this.props.onCreate && this.state.search));
    }
    componentDidUpdate(_, prevState) {
        if (this.state.blindText &&
            prevState.blindText !== this.state.blindText) {
            this.handleBlindTextUpdate();
        }
    }
    componentWillUnmount() {
        this.removeDocumentListener();
    }
    render() {
        const { Container } = Select;
        const { className, options, creatable, clearable, placeholder, value, disabled, error, menuComponent, labelComponent, optionComponent, valueComponentSingle, valueComponentMulti, arrowComponent, clearComponent, hideSelectedOptions, equalCompareProp, multi, native, emptyText, rowHeight, menuWidth, menuHeight, keepSearchOnBlur } = this.props;
        const { open, search, selectedIndex, focused } = this.state;
        const searchable = this.props.searchable || creatable;
        if (this.props.children) {
            return this.renderChildren();
        }
        const classNames = [
            'react-slct',
            className,
            open && 'open',
            error && 'has-error'
        ].filter(c => Boolean(c));
        return (React.createElement(Container, { className: classNames.join(' '), disabled: disabled, ref: this.onContainerRef, "data-role": this.props['data-role'], onKeyUp: this.onKeyUp, onKeyDown: this.onKeyDown },
            this.renderNativeSelect(),
            React.createElement(value_1.Value, { clearable: clearable, searchable: searchable, open: open, disabled: disabled, multi: multi, mobile: native, focused: focused, options: options, placeholder: placeholder, error: error, value: value, search: search, keepSearchOnBlur: keepSearchOnBlur, equalCompareProp: equalCompareProp, labelComponent: labelComponent, valueComponentSingle: valueComponentSingle, valueComponentMulti: valueComponentMulti, arrowComponent: arrowComponent, clearComponent: clearComponent, onClear: this.onClear, onClick: this.toggleMenu, onSearch: this.onSearch, onSearchFocus: this.onSearchFocus, onSearchBlur: this.onSearchBlur, onOptionRemove: this.onOptionRemove }),
            React.createElement(menu_1.Menu, { open: open, options: this.options, value: value, multi: multi, error: error, search: search, selectedIndex: selectedIndex, menuComponent: menuComponent, labelComponent: labelComponent, optionComponent: optionComponent, hideSelectedOptions: hideSelectedOptions, equalCompareProp: equalCompareProp, emptyText: emptyText, rowHeight: rowHeight, menuWidth: menuWidth, menuHeight: menuHeight, onSelect: this.onOptionSelect })));
    }
    renderNativeSelect() {
        const { NativeSelect } = Select;
        const { native, placeholder, multi, disabled } = this.props;
        const dataRole = this.props['data-role']
            ? `select-${this.props['data-role']}`
            : undefined;
        const clearable = this.props.clearable && native;
        const value = utils_1.isArray(this.props.value) && multi
            ? this.props.value.map(this.findOptionIndex)
            : this.findOptionIndex(this.props.value || '');
        return (React.createElement(NativeSelect, { ref: this.nativeSelect, multiple: multi, value: value, disabled: disabled, native: native, tabIndex: -1, "data-role": dataRole, onChange: this.onChangeNativeSelect },
            React.createElement("option", { value: "", disabled: !clearable }, placeholder),
            this.options.map((option, i) => (React.createElement("option", { key: utils_1.toKey(option.value), value: `${i}`, disabled: option.disabled }, option.label)))));
    }
    renderChildren() {
        const { options, placeholder, multi, children } = this.props;
        const { open, search } = this.state;
        const valueOptions = utils_1.getValueOptions(options || [], this.props.value, this.props.multi, this.props.equalCompareProp);
        const value = !multi
            ? this.props.value
            : valueOptions.map(option => option.value);
        const showPlaceholder = !search &&
            (utils_1.isArray(value) && multi
                ? value.length === 0
                : value === undefined || value === null);
        if (!children) {
            return null;
        }
        return children({
            options: this.options,
            open,
            value,
            MenuContainer: menu_container_1.MenuContainer,
            placeholder: showPlaceholder ? placeholder : undefined,
            onToggle: () => this.toggleMenu(),
            onClose: () => this.closeMenu(),
            onOpen: () => this.openMenu(),
            onRef: ref => (this.container = ref)
        });
    }
    toggleMenu() {
        const open = !this.state.open;
        if (open) {
            this.openMenu();
        }
        else {
            this.closeMenu();
        }
    }
    openMenu() {
        const selectedIndex = this.props.hideSelectedOptions
            ? undefined
            : this.options.findIndex(option => utils_1.equal(option.value, this.props.value, this.props.equalCompareProp));
        const keepSearchOnBlur = this.props.keepSearchOnBlur && !this.props.value;
        this.setState({
            open: true,
            search: keepSearchOnBlur ? this.state.search : undefined,
            selectedIndex
        }, () => {
            if (this.props.onOpen) {
                this.props.onOpen();
            }
            this.addDocumentListener();
        });
    }
    closeMenu(callback = () => { }) {
        const keepSearchOnBlur = this.props.keepSearchOnBlur && !this.props.value;
        this.removeDocumentListener();
        this.setState({
            open: false,
            search: keepSearchOnBlur ? this.state.search : undefined,
            selectedIndex: undefined
        }, () => {
            if (this.props.onClose) {
                this.props.onClose();
            }
            callback();
        });
    }
    createOption(value, cb) {
        const { onCreate } = this.props;
        if (onCreate) {
            this.closeMenu(() => {
                onCreate(value);
                if (cb) {
                    cb();
                }
            });
        }
    }
    addDocumentListener() {
        this.removeDocumentListener();
        if (this.document) {
            this.document.addEventListener('click', this.onDocumentClick);
        }
    }
    removeDocumentListener() {
        if (this.document) {
            this.document.removeEventListener('click', this.onDocumentClick);
        }
    }
    cleanBlindText() {
        this.blindTextTimeout = setTimeout(() => this.setState({ blindText: '' }), 700);
    }
    findOptionIndex(val) {
        let index = this.options.findIndex(option => option.value === val);
        if (index === -1) {
            if (typeof val === 'object') {
                index = this.options.findIndex(option => utils_1.equal(option.value, val, this.props.equalCompareProp));
            }
            if (index === -1) {
                return '';
            }
        }
        return String(index);
    }
    onChangeNativeSelect(e) {
        const { onChange, multi } = this.props;
        const { currentTarget } = e;
        if (onChange) {
            if (currentTarget.value === '') {
                this.onClear();
            }
            else {
                const values = Array.from(currentTarget.selectedOptions).map(htmlOption => this.options[htmlOption.index - 1].value);
                if (multi) {
                    onChange(values);
                }
                else {
                    onChange(values[0]);
                }
            }
        }
    }
    onSearchFocus() {
        const { open, focused } = this.state;
        if (!open && !focused && !this.props.native) {
            this.openMenu();
        }
        this.setState({ focused: true });
    }
    onSearchBlur() {
        this.setState({ focused: false });
    }
    onOptionSelect(value, option) {
        const { current } = this.nativeSelect;
        const { multi, onChange, creatable } = this.props;
        let optionWasCreated = false;
        const selectOnNative = () => {
            if (current) {
                current.value =
                    utils_1.isArray(value) && multi
                        ? value.map(this.findOptionIndex)
                        : this.findOptionIndex(value);
            }
            this.setState({ focused: true }, () => this.closeMenu(() => onChange && onChange(value, option)));
        };
        if (creatable) {
            const createValue = (val) => {
                const option = this.options.find(option => this.optionIsCreatable(option) && option.value === val);
                if (option) {
                    optionWasCreated = true;
                    this.createOption(option.value, selectOnNative);
                }
            };
            if (utils_1.isArray(value) && multi) {
                value.map(createValue);
            }
            else {
                createValue(value);
            }
        }
        if (!optionWasCreated) {
            selectOnNative();
        }
    }
    onOptionRemove(value) {
        if (utils_1.isArray(this.props.value) && this.props.multi) {
            const values = this.props.value.filter(val => !utils_1.equal(val, value, this.props.equalCompareProp));
            this.onOptionSelect(values);
        }
    }
    onClear() {
        this.onOptionSelect(this.props.multi ? [] : undefined);
    }
    onSearch(search) {
        this.setState({ search }, () => {
            if (this.options.length === 1 || (this.props.creatable && search)) {
                this.setState({ selectedIndex: 0 });
            }
            else {
                this.setState({ selectedIndex: undefined });
            }
            if (this.props.onSearch) {
                this.props.onSearch(search);
            }
        });
    }
    onDocumentClick(e) {
        const { target } = e;
        if (target.closest('.react-slct-menu') ||
            target.closest('.react-slct-value')) {
            return;
        }
        if (this.container && !this.container.contains(target)) {
            this.closeMenu();
        }
    }
    onKeyDown({ keyCode }) {
        const { searchable, creatable } = this.props;
        switch (keyCode) {
            case utils_1.keys.TAB:
                if (this.state.open) {
                    this.closeMenu();
                }
                break;
        }
        if (!searchable && !creatable) {
            this.handleBlindText(keyCode);
        }
    }
    onKeyUp({ keyCode }) {
        const { search, open } = this.state;
        const { value, multi } = this.props;
        let selectedIndex = this.state.selectedIndex;
        switch (keyCode) {
            case utils_1.keys.ARROW_UP:
                if (open) {
                    if (selectedIndex !== undefined) {
                        selectedIndex = selectedIndex - 1;
                        if (selectedIndex < 0) {
                            selectedIndex = this.options.length - 1;
                        }
                    }
                    this.setState({ selectedIndex });
                }
                else {
                    this.openMenu();
                }
                break;
            case utils_1.keys.ARROW_DOWN:
                if (open) {
                    if (selectedIndex === undefined ||
                        selectedIndex === this.options.length - 1) {
                        selectedIndex = 0;
                    }
                    else {
                        selectedIndex = selectedIndex + 1;
                    }
                    this.setState({ selectedIndex });
                }
                else {
                    this.openMenu();
                }
                break;
            case utils_1.keys.ENTER:
                if (this.state.selectedIndex === 0 &&
                    this.optionIsCreatable(this.options[0])) {
                    this.createOption(search);
                }
                else if (selectedIndex !== undefined &&
                    this.options[selectedIndex]) {
                    const option = this.options[selectedIndex];
                    const newValue = option.value;
                    this.onOptionSelect(utils_1.isArray(value) && multi
                        ? [...value, newValue]
                        : newValue, option);
                }
                break;
            case utils_1.keys.ESC:
                if (open) {
                    this.closeMenu();
                }
                break;
        }
    }
    handleBlindText(keyCode) {
        const { blindText } = this.state;
        if (keyCode === utils_1.keys.BACKSPACE && blindText.length) {
            clearTimeout(this.blindTextTimeout);
            this.setState({
                blindText: blindText.slice(0, blindText.length - 1)
            }, this.cleanBlindText);
        }
        else if (keyCode === utils_1.keys.SPACE) {
            clearTimeout(this.blindTextTimeout);
            this.setState({
                blindText: blindText + ' '
            }, this.cleanBlindText);
        }
        else {
            const key = String.fromCodePoint(keyCode);
            if (/\w/.test(key)) {
                clearTimeout(this.blindTextTimeout);
                this.setState({
                    blindText: blindText + key
                }, this.cleanBlindText);
            }
        }
    }
    onContainerRef(el) {
        this.container = el;
    }
    handleBlindTextUpdate() {
        const { open, blindText } = this.state;
        const { multi } = this.props;
        if (open) {
            const selectedIndex = this.options.findIndex(option => option.label.toLowerCase().startsWith(blindText.toLowerCase()));
            if (selectedIndex >= 0) {
                this.setState({ selectedIndex });
            }
        }
        else if (!multi) {
            if (blindText) {
                const option = this.options.find(option => option.label
                    .toLowerCase()
                    .startsWith(blindText.toLowerCase()));
                if (option) {
                    this.onOptionSelect(option.value, option);
                }
            }
            else {
                this.onOptionSelect(undefined);
            }
        }
    }
}
Select.Container = styled_components_1.default.div `
        display: flex;
        position: relative;
        cursor: default;
        width: 100%;
        box-sizing: border-box;
        pointer-events: ${(props) => props.disabled ? 'none' : 'auto'};
        opacity: ${(props) => props.disabled ? 0.75 : 1};
        user-select: none;
    `;
Select.NativeSelect = styled_components_1.default.select `
        display: block;
        opacity: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
        ${(props) => props.native
    ? styled_components_1.css `
                      z-index: 1;
                  `
    : styled_components_1.css `
                      pointer-events: none;
                      z-index: auto;
                  `};
    `;
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Select.prototype, "toggleMenu", null);
tslib_1.__decorate([
    lodash_decorators_1.debounce(0),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Select.prototype, "openMenu", null);
tslib_1.__decorate([
    lodash_decorators_1.debounce(0),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Select.prototype, "closeMenu", null);
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Select.prototype, "cleanBlindText", null);
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Select.prototype, "findOptionIndex", null);
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof React !== "undefined" && React.SyntheticEvent) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Select.prototype, "onChangeNativeSelect", null);
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Select.prototype, "onSearchFocus", null);
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Select.prototype, "onSearchBlur", null);
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_b = typeof typings_1.Option !== "undefined" && typings_1.Option) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Select.prototype, "onOptionSelect", null);
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Select.prototype, "onOptionRemove", null);
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Select.prototype, "onClear", null);
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], Select.prototype, "onSearch", null);
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Select.prototype, "onDocumentClick", null);
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof React !== "undefined" && React.KeyboardEvent) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Select.prototype, "onKeyDown", null);
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof React !== "undefined" && React.KeyboardEvent) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Select.prototype, "onKeyUp", null);
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Select.prototype, "onContainerRef", null);
exports.Select = Select;
//# sourceMappingURL=index.js.map
});
___scope___.file("value.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_decorators_1 = require("lodash-decorators");
const React = require("react");
const styled_components_1 = require("styled-components");
const label_1 = require("./label");
const utils_1 = require("./utils");
const value_component_multi_1 = require("./value-component-multi");
const value_component_single_1 = require("./value-component-single");
const Button = styled_components_1.default.button `
    background: transparent;
    border: none;
    margin: 0;
    font-size: 20px;
    padding: 0;
    line-height: 1;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;
const ArrowButton = styled_components_1.default(Button) `
    font-size: 12px;
    color: #ccc;
    transform: translateY(2px);

    &:hover {
        color: #333;
    }
`;
const ValueContainer = styled_components_1.default.div `
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    min-height: 32px;
    pointer-events: ${(props) => props.mobile || props.disabled ? 'none' : 'auto'};
    padding: 5px 10px;
    background: #fff;
    cursor: default;
    border-width: 1px;
    border-style: solid;
    border-color: ${(props) => props.error ? 'var(--react-slct-error-color)' : '#ccc'};
    z-index: 0;
    box-sizing: border-box;
    max-width: 100%;
    box-shadow: ${(props) => props.focused ? 'rgba(0, 0, 0, 0.15) 0 0 2px' : 'none'};
`;
const ValueLeft = styled_components_1.default.div `
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: ${(props) => props.multi && props.hasValue ? 'wrap' : 'nowrap'};
    user-select: none;
    min-width: 0;
    box-sizing: border-box;
    margin: ${(props) => props.multi && props.hasValue ? '-2px -5px' : 0};
`;
const ValueRight = styled_components_1.default.div `
    display: flex;
    align-items: center;
    margin-left: 4px;
    box-sizing: border-box;
`;
const Placeholder = styled_components_1.default(label_1.SelectLabel) `
    color: #aaa;
`;
const ClearButton = styled_components_1.default(Button) `
    margin-right: 6px;
`;
const ClearContainer = styled_components_1.default.span `
    color: #ccc;

    &:hover {
        color: #333;
    }
`;
const ClearX = () => React.createElement(ClearContainer, null, "\u00D7");
const Search = styled_components_1.default.span `
    min-width: 1px;
    margin-left: -1px;
    height: 16px;
    opacity: ${(props) => (props.canSearch ? 1 : 0)};
    user-select: text;
    position: ${(props) => props.canSearch ? 'static' : 'absolute'};

    &:focus {
        outline: none;
    }
`;
class Value extends React.PureComponent {
    constructor(props) {
        super(props);
        this.search = React.createRef();
        const window = utils_1.getWindow();
        if (window) {
            window.addEventListener('blur', this.blur);
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.search && !this.props.search && this.search.current) {
            this.search.current.innerText = '';
        }
        if (prevProps.focused !== this.props.focused && this.props.focused) {
            this.focus();
        }
    }
    render() {
        const { options = [], value, disabled, clearable, open, mobile, multi, focused, equalCompareProp, error } = this.props;
        const ArrowComponent = this.props.arrowComponent;
        const ClearComponent = this.props.clearComponent || ClearX;
        const valueOptions = utils_1.getValueOptions(options, value, multi, equalCompareProp);
        const showClearer = Boolean(clearable && valueOptions.length && !mobile);
        const searchAtStart = !multi || valueOptions.length === 0;
        const searchAtEnd = multi && valueOptions.length > 0;
        return (React.createElement(ValueContainer, { "data-role": "value", className: "react-slct-value", disabled: disabled, mobile: mobile, focused: focused, error: error, onClick: this.onClick },
            React.createElement(ValueLeft, { className: "value-left", multi: multi, hasValue: !!valueOptions.length },
                searchAtStart && this.renderSearch(),
                this.renderValues(valueOptions),
                searchAtEnd && this.renderSearch()),
            React.createElement(ValueRight, { className: "value-right" },
                showClearer && (React.createElement(ClearButton, { type: "button", tabIndex: -1, className: "clearer", onClick: this.onClear },
                    React.createElement(ClearComponent, null))),
                React.createElement(ArrowButton, { type: "button", className: "arrow", tabIndex: -1 }, ArrowComponent ? (React.createElement(ArrowComponent, { open: open })) : open ? ('▲') : ('▼')))));
    }
    renderSearch() {
        const { open, value, disabled, searchable, search, keepSearchOnBlur, onSearchFocus, onSearchBlur } = this.props;
        const canSearch = (open && searchable) ||
            (keepSearchOnBlur && !value && searchable) ||
            Boolean(search);
        if (disabled && !keepSearchOnBlur) {
            return null;
        }
        return (React.createElement(Search, { className: "search", contentEditable: true, canSearch: canSearch, onInput: this.onSearch, onKeyDown: this.onKeyDown, onFocus: onSearchFocus, onBlur: onSearchBlur, ref: this.search }));
    }
    renderValues(valueOptions) {
        const { placeholder, search, labelComponent, valueComponentSingle, valueComponentMulti, multi, open } = this.props;
        if (search && open && !multi) {
            return null;
        }
        if (valueOptions.length === 0 && !search) {
            return React.createElement(Placeholder, null, placeholder);
        }
        const Single = valueComponentSingle || value_component_single_1.ValueComponentSingle;
        const Multi = (valueComponentMulti || value_component_multi_1.ValueComponentMulti);
        return valueOptions.map(option => multi ? (React.createElement(Multi, { key: utils_1.toKey(option.value), option: option, labelComponent: labelComponent, options: valueOptions, onRemove: this.props.onOptionRemove })) : (React.createElement(Single, { key: utils_1.toKey(option.value), option: option, labelComponent: labelComponent })));
    }
    focus() {
        const el = this.search.current;
        if (el) {
            el.focus();
            if (typeof window.getSelection != 'undefined' &&
                typeof document.createRange != 'undefined') {
                const range = document.createRange();
                const sel = window.getSelection();
                range.selectNodeContents(el);
                range.collapse(false);
                if (sel) {
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        }
    }
    blur() {
        if (this.search.current) {
            this.search.current.blur();
        }
    }
    onClick() {
        if (!this.props.disabled) {
            this.focus();
            this.props.onClick();
        }
    }
    onClear(e) {
        e.stopPropagation();
        this.props.onClear();
    }
    onSearch(e) {
        if (this.props.searchable) {
            this.props.onSearch(e.currentTarget.innerText.trim());
        }
        else {
            e.preventDefault();
        }
    }
    onKeyDown(e) {
        const { searchable } = this.props;
        if (e.metaKey) {
            return;
        }
        if ((!searchable && e.keyCode !== utils_1.keys.TAB) ||
            e.keyCode === utils_1.keys.ENTER ||
            e.keyCode === utils_1.keys.ARROW_UP ||
            e.keyCode === utils_1.keys.ARROW_DOWN) {
            e.preventDefault();
        }
    }
}
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Value.prototype, "blur", null);
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Value.prototype, "onClick", null);
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof React !== "undefined" && React.SyntheticEvent) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Value.prototype, "onClear", null);
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof React !== "undefined" && React.KeyboardEvent) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Value.prototype, "onSearch", null);
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof React !== "undefined" && React.KeyboardEvent) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Value.prototype, "onKeyDown", null);
exports.Value = Value;
//# sourceMappingURL=value.js.map
});
___scope___.file("label.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
exports.SelectLabel = styled_components_1.default.span `
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    user-select: none;
    box-sizing: border-box;
`;
//# sourceMappingURL=label.js.map
});
___scope___.file("utils.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toKey(value) {
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'object') {
        if (value.id) {
            return value.id;
        }
        if (value.toJSON) {
            return value.toJSON();
        }
    }
    return JSON.stringify(value);
}
exports.toKey = toKey;
function equal(valueA, valueB, equalCompareProp = 'id') {
    if (valueA === valueB) {
        return true;
    }
    if (!valueA || !valueB) {
        return false;
    }
    if (typeof valueA === 'object' && typeof valueB === 'object') {
        if (equalCompareProp &&
            valueA[equalCompareProp] !== undefined &&
            valueA[equalCompareProp] !== null &&
            valueB[equalCompareProp] !== undefined &&
            valueB[equalCompareProp] !== null &&
            valueA[equalCompareProp] === valueB[equalCompareProp]) {
            return true;
        }
        if (valueA.toJSON && valueB.toJSON) {
            return (JSON.stringify(valueA.toJSON()) ===
                JSON.stringify(valueB.toJSON()));
        }
        return JSON.stringify(valueA) === JSON.stringify(valueB);
    }
    return false;
}
exports.equal = equal;
function getValueOptions(options, value, multi, equalCompareProp) {
    return options.filter(option => {
        if (isArray(value) && multi) {
            return value.some(val => equal(option.value, val, equalCompareProp));
        }
        else {
            return equal(option.value, value, equalCompareProp);
        }
    });
}
exports.getValueOptions = getValueOptions;
function isArray(val) {
    if (Array.isArray(val)) {
        return true;
    }
    // this is just a workaround for potential observable arrays
    if (val && val.map) {
        return true;
    }
    return false;
}
exports.isArray = isArray;
function getDocument() {
    if (typeof document !== 'undefined') {
        return document;
    }
    return undefined;
}
exports.getDocument = getDocument;
function getWindow() {
    if (typeof window !== 'undefined') {
        return window;
    }
    return undefined;
}
exports.getWindow = getWindow;
function getWindowInnerHeight(defaultHeight = 700) {
    const window = getWindow();
    if (window) {
        return window.innerHeight;
    }
    return defaultHeight;
}
exports.getWindowInnerHeight = getWindowInnerHeight;
exports.keys = {
    ARROW_UP: 38,
    ARROW_DOWN: 40,
    ENTER: 13,
    TAB: 9,
    ESC: 27,
    BACKSPACE: 8,
    SPACE: 32
};
//# sourceMappingURL=react-slct.js.map?tm=1574771081283
});
___scope___.file("value-component-multi.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_decorators_1 = require("lodash-decorators");
const React = require("react");
const styled_components_1 = require("styled-components");
const label_1 = require("./label");
class Remove extends React.PureComponent {
    render() {
        const { StyledRemove } = Remove;
        return (React.createElement(StyledRemove, { className: "remove", type: "button", tabIndex: -1, onClick: this.onClick }, "\u00D7"));
    }
    onClick(e) {
        e.stopPropagation();
        this.props.onClick(this.props.value);
    }
}
Remove.StyledRemove = styled_components_1.default.button `
        cursor: pointer;
        color: #007eff;
        border: none;
        background: none;
        padding: 2px 4px;
        margin: 0;
        margin-right: 4px;
        line-height: 1;
        display: inline-block;
        border-right: 1px solid rgba(0, 126, 255, 0.24);
        margin-left: -2px;
        font-size: 13px;

        &:hover {
            background-color: rgba(0, 113, 230, 0.08);
        }

        &:focus {
            outline: none;
        }
    `;
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof React !== "undefined" && React.SyntheticEvent) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Remove.prototype, "onClick", null);
class ValueComponentMulti extends React.PureComponent {
    render() {
        const { TagContainer } = ValueComponentMulti;
        const { option, labelComponent, onRemove } = this.props;
        const Label = (labelComponent || label_1.SelectLabel);
        const className = ['value-multi', this.props.className]
            .filter(c => Boolean(c))
            .join(' ');
        return (React.createElement(TagContainer, Object.assign({ className: className }, option),
            React.createElement(Remove, { value: option.value, onClick: onRemove }, "\u00D7"),
            React.createElement(Label, Object.assign({ type: "value-multi", active: true }, option), option.label)));
    }
}
exports.ValueComponentMulti = ValueComponentMulti;
ValueComponentMulti.TagContainer = styled_components_1.default.div `
        display: flex;
        padding: 0px 3px;
        background-color: rgba(0, 126, 255, 0.08);
        border-radius: 2px;
        border: 1px solid rgba(0, 126, 255, 0.24);
        color: #007eff;
        font-size: 0.9em;
        line-height: 1.4;
        margin: 2px 3px;
        align-items: center;

        &:last-of-type {
            margin-right: 5px;
        }
    `;
//# sourceMappingURL=value-component-multi.js.map
});
___scope___.file("value-component-single.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const label_1 = require("./label");
exports.ValueComponentSingle = React.memo((props) => {
    const Label = props.labelComponent || label_1.SelectLabel;
    const className = ['value-single', props.className]
        .filter(c => Boolean(c))
        .join(' ');
    return (React.createElement(Label, Object.assign({ active: true, type: "value-single", className: className }, props.option), props.option.label));
});
//# sourceMappingURL=value-component-single.js.map
});
___scope___.file("menu.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const react_window_1 = require("react-window");
const styled_components_1 = require("styled-components");
const label_1 = require("./label");
const menu_container_1 = require("./menu-container");
const menu_row_1 = require("./menu-row");
const option_1 = require("./option");
const utils_1 = require("./utils");
const EmptyOptionItem = styled_components_1.default(option_1.OptionComponent.OptionItem) `
    height: 100%;
    border: 1px solid #ccc;
`;
const Empty = (props) => (React.createElement(EmptyOptionItem, null,
    React.createElement(label_1.SelectLabel, null,
        React.createElement("i", null, props.emptyText || 'No results'))));
function Menu(props) {
    const { rowHeight = 32, selectedIndex, open, error, menuWidth, menuHeight, multi, hideSelectedOptions } = props;
    const currentValue = utils_1.isArray(props.value) && multi ? props.value : [props.value];
    const options = React.useMemo(() => (props.options || []).filter(option => {
        if (hideSelectedOptions) {
            const selected = currentValue.some(val => utils_1.equal(val, option.value, props.equalCompareProp));
            if (selected) {
                return false;
            }
        }
        return true;
    }), [
        props.options,
        props.equalCompareProp,
        hideSelectedOptions,
        currentValue
    ]);
    const [rect, setRect] = react_1.useState();
    const list = react_1.useRef(null);
    const width = menuWidth || (rect && rect.width !== 'auto' ? rect.width : 0);
    const height = Math.min(Math.max(options.length * rowHeight, rowHeight) + 2, menuHeight || 185);
    react_1.useEffect(() => {
        if (open &&
            list.current &&
            selectedIndex !== undefined &&
            selectedIndex !== -1) {
            list.current.scrollToItem(selectedIndex, 'center');
        }
    }, [open]);
    const itemData = React.useMemo(() => {
        return Object.assign(Object.assign({}, props), { options, onSelect: (value, option) => {
                if (utils_1.isArray(props.value) && props.multi) {
                    const found = props.value.some(item => utils_1.equal(item, value, props.equalCompareProp));
                    const values = found
                        ? props.value.filter(item => !utils_1.equal(item, value, props.equalCompareProp))
                        : Array.from(new Set([...props.value, value]));
                    props.onSelect(values, option);
                }
                else {
                    props.onSelect(value, option);
                }
            } });
    }, [
        options.length,
        props.search,
        props.rowHeight,
        props.selectedIndex,
        props.labelComponent,
        props.optionComponent,
        props.value
    ]);
    function renderList(width, height, rowHeight) {
        const MenuContent = props.menuComponent;
        const itemCount = options.length;
        if (MenuContent) {
            return React.createElement(MenuContent, Object.assign({}, props));
        }
        if (itemCount === 0) {
            return React.createElement(Empty, { emptyText: props.emptyText });
        }
        return (React.createElement(react_window_1.FixedSizeList, { className: "react-slct-menu-list", ref: list, width: width, height: height, itemSize: rowHeight, itemCount: itemCount, itemData: itemData }, menu_row_1.MenuRow));
    }
    return open ? (React.createElement(menu_container_1.MenuContainer, { error: error, menuWidth: width, menuHeight: height, onRect: rect => setRect(rect) }, renderList(width, height, rowHeight))) : null;
}
exports.Menu = Menu;
//# sourceMappingURL=menu.js.map
});
___scope___.file("menu-container.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_decorators_1 = require("lodash-decorators");
const React = require("react");
const react_dom_1 = require("react-dom");
const styled_components_1 = require("styled-components");
const utils_1 = require("./utils");
function menuPosition({ rect, menuHeight = 186 }) {
    if (!rect) {
        return 'bottom';
    }
    const { height } = rect;
    if (height === 'auto' || menuHeight === 'auto') {
        return 'bottom';
    }
    if (rect.top + height + menuHeight <= utils_1.getWindowInnerHeight()) {
        return 'bottom';
    }
    return 'top';
}
function getContainerTop(props) {
    const { rect } = props;
    if (!rect) {
        return 0;
    }
    const menuHeight = (props.menuHeight !== 'auto' && props.menuHeight) || 186;
    const height = rect.height === 'auto' ? 32 : rect.height;
    switch (menuPosition(props)) {
        case 'top':
            return rect.top - menuHeight + 1;
        case 'bottom':
            return rect.top + height - 1;
    }
}
const MenuOverlay = styled_components_1.default.div `
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
`;
const MenuWrapper = styled_components_1.default.div `
    position: fixed;
    z-index: 9999;
    background: #fff;
    box-sizing: border-box;
    box-shadow: ${(props) => menuPosition(props) === 'bottom'
    ? '0 2px 5px rgba(0, 0, 0, 0.1)'
    : '0 -2px 5px rgba(0, 0, 0, 0.1)'};

    .react-slct-menu-list {
        box-sizing: border-box;
        border-width: 1px;
        border-style: solid;
        border-color: ${(props) => props.error ? 'var(--react-slct-error-color)' : '#ccc'};
        background-color: #fff;

        &:focus {
            outline: none;
        }
    }
`;
class MenuContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    get menuOverlayRect() {
        if (this.menuOverlay) {
            const clientRect = this.menuOverlay.getBoundingClientRect();
            return {
                left: Math.round(clientRect.left),
                top: Math.round(clientRect.top),
                width: Math.round(clientRect.width),
                height: Math.round(clientRect.height)
            };
        }
        return undefined;
    }
    get menuWrapperRect() {
        if (this.menuWrapper) {
            const clientRect = this.menuWrapper.getBoundingClientRect();
            return {
                left: Math.round(clientRect.left),
                top: Math.round(clientRect.top),
                width: Math.round(clientRect.width),
                height: Math.round(clientRect.height)
            };
        }
        return undefined;
    }
    get style() {
        const { window } = this;
        const { menuLeft, menuTop, menuWidth } = this.props;
        const { menuOverlay, menuWrapper } = this.state;
        const menuHeight = this.props.menuHeight ||
            (menuWrapper ? menuWrapper.height : 'auto');
        let width = menuWidth || (menuOverlay ? menuOverlay.width : 'auto');
        const height = menuHeight || (menuWrapper ? menuWrapper.height : 'auto');
        const top = menuTop !== undefined
            ? menuTop
            : getContainerTop({
                rect: menuOverlay,
                menuHeight: height
            });
        let left = menuLeft !== undefined
            ? menuLeft
            : menuOverlay
                ? menuOverlay.left
                : 0;
        if (window) {
            const numWidth = Number(width);
            if (numWidth > window.innerWidth) {
                width = window.innerWidth - 20;
            }
            if (left + numWidth > window.innerWidth) {
                left = Math.max(10, window.innerWidth - numWidth - 20);
            }
        }
        return { top, left, width, height };
    }
    get window() {
        return utils_1.getWindow();
    }
    get document() {
        return utils_1.getDocument();
    }
    componentDidMount() {
        this.addListener();
    }
    componentDidUpdate(_, prevState) {
        const { menuOverlay, menuWrapper } = this.state;
        if (this.props.onRect) {
            if (prevState.menuOverlay !== menuOverlay ||
                prevState.menuWrapper !== menuWrapper) {
                this.props.onRect(menuOverlay, menuWrapper);
            }
        }
    }
    componentWillUnmount() {
        this.removeListener();
    }
    render() {
        const { error, onClick, children } = this.props;
        const className = ['react-slct-menu', this.props.className]
            .filter(c => c)
            .join(' ');
        return (React.createElement(MenuOverlay, { ref: this.onMenuOverlay }, this.document
            ? react_dom_1.createPortal(React.createElement(MenuWrapper, { "data-role": "menu", className: className, error: error, ref: this.onMenuWrapper, onClick: onClick, rect: this.state.menuOverlay, style: this.style }, children), this.document.body)
            : null));
    }
    addListener() {
        if (this.window) {
            this.window.addEventListener('scroll', this.onViewportChange, true);
            this.window.addEventListener('resize', this.onViewportChange, true);
        }
    }
    removeListener() {
        if (this.window) {
            this.window.removeEventListener('resize', this.onViewportChange, true);
            this.window.removeEventListener('scroll', this.onViewportChange, true);
        }
    }
    allowRectChange(e) {
        if (e.target.closest && !e.target.closest('.react-slct-menu')) {
            return false;
        }
        return true;
    }
    onViewportChange(e) {
        if (this.allowRectChange(e)) {
            this.setState({
                menuOverlay: this.menuOverlayRect,
                menuWrapper: this.menuWrapperRect
            });
        }
    }
    onMenuOverlay(el) {
        this.menuOverlay = el;
        if (this.menuOverlay) {
            this.setState({
                menuOverlay: this.menuOverlayRect
            });
        }
    }
    onMenuWrapper(el) {
        if (el && this.props.onRef) {
            this.props.onRef(el);
        }
        this.menuWrapper = el;
        if (this.menuWrapper) {
            this.setState({
                menuWrapper: this.menuWrapperRect
            });
        }
    }
}
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MenuContainer.prototype, "onViewportChange", null);
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MenuContainer.prototype, "onMenuOverlay", null);
tslib_1.__decorate([
    lodash_decorators_1.bind,
    lodash_decorators_1.debounce(16),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MenuContainer.prototype, "onMenuWrapper", null);
exports.MenuContainer = MenuContainer;
//# sourceMappingURL=menu-container.js.map
});
___scope___.file("menu-row.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const react_window_1 = require("react-window");
const option_1 = require("./option");
const utils_1 = require("./utils");
exports.MenuRow = react_1.memo(({ index, style, data }) => {
    const { options = [], labelComponent, selectedIndex, optionComponent, rowHeight, search, equalCompareProp, multi, onSelect } = data;
    const option = options[index];
    const currentValue = utils_1.isArray(data.value) && multi ? data.value : [data.value];
    const Component = optionComponent || option_1.OptionComponent;
    return (React.createElement("div", { style: style },
        React.createElement(Component, { option: option, labelComponent: labelComponent, height: rowHeight, active: currentValue.some(val => utils_1.equal(val, option.value, equalCompareProp)), selected: selectedIndex === index, search: search, onSelect: onSelect })));
}, react_window_1.areEqual);
//# sourceMappingURL=menu-row.js.map
});
___scope___.file("option.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_decorators_1 = require("lodash-decorators");
const React = require("react");
const styled_components_1 = require("styled-components");
const label_1 = require("./label");
class OptionComponent extends React.PureComponent {
    render() {
        const { OptionItem } = OptionComponent;
        const { active, selected, labelComponent, option, height } = this.props;
        const Label = (labelComponent ? labelComponent : label_1.SelectLabel);
        const className = [
            'option',
            this.props.className,
            selected ? 'selected' : null,
            active ? 'active' : null
        ].filter(v => Boolean(v));
        return (React.createElement(OptionItem, { className: className.join(' '), selected: selected, active: active, height: height, onClick: this.onClick },
            React.createElement(Label, Object.assign({ type: "option", active: active }, option), option.label)));
    }
    onClick() {
        this.props.onSelect(this.props.option.value, this.props.option);
    }
}
OptionComponent.OptionItem = styled_components_1.default.div `
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        height: ${(props) => props.height || 32}px;
        padding: 0 10px;
        min-width: 0;
        cursor: pointer;
        box-sizing: border-box;
        background-color: ${(props) => props.active ? '#ddd' : props.selected ? '#eee' : '#fff'};

        &:hover {
            background-color: ${(props) => props.active ? '#ddd' : '#eee'};
        }
    `;
tslib_1.__decorate([
    lodash_decorators_1.bind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], OptionComponent.prototype, "onClick", null);
exports.OptionComponent = OptionComponent;
//# sourceMappingURL=option.js.map
});
___scope___.file("typings.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=react-slct.js.map?tm=1574353094948
});
___scope___.file("global-stylings.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_dom_1 = require("react-dom");
const styled_components_1 = require("styled-components");
const id = 'react-slct-style';
function create() {
    const ReactSlctStyle = styled_components_1.createGlobalStyle `
        .react-slct, .react-slct-menu {
            --react-slct-error-color: #ff5c5c; 
        }
    `;
    const reactSlctDiv = document.createElement('div');
    reactSlctDiv.id = id;
    document.body.appendChild(reactSlctDiv);
    react_dom_1.render(React.createElement(ReactSlctStyle, null), reactSlctDiv);
}
if (!document.getElementById(id)) {
    create();
}
//# sourceMappingURL=global-stylings.js.map
});
return ___scope___.entry = "index.jsx";
});

FuseBox.import("default/index.jsx");
FuseBox.main("default/index.jsx");
})
(function(e){function r(e){var r=e.charCodeAt(0),n=e.charCodeAt(1);if((m||58!==n)&&(r>=97&&r<=122||64===r)){if(64===r){var t=e.split("/"),i=t.splice(2,t.length).join("/");return[t[0]+"/"+t[1],i||void 0]}var o=e.indexOf("/");if(o===-1)return[e];var a=e.substring(0,o),f=e.substring(o+1);return[a,f]}}function n(e){return e.substring(0,e.lastIndexOf("/"))||"./"}function t(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];for(var n=[],t=0,i=arguments.length;t<i;t++)n=n.concat(arguments[t].split("/"));for(var o=[],t=0,i=n.length;t<i;t++){var a=n[t];a&&"."!==a&&(".."===a?o.pop():o.push(a))}return""===n[0]&&o.unshift(""),o.join("/")||(o.length?"/":".")}function i(e){var r=e.match(/\.(\w{1,})$/);return r&&r[1]?e:e+".js"}function o(e){if(m){var r,n=document,t=n.getElementsByTagName("head")[0];/\.css$/.test(e)?(r=n.createElement("link"),r.rel="stylesheet",r.type="text/css",r.href=e):(r=n.createElement("script"),r.type="text/javascript",r.src=e,r.async=!0),t.insertBefore(r,t.firstChild)}}function a(e,r){for(var n in e)e.hasOwnProperty(n)&&r(n,e[n])}function f(e){return{server:require(e)}}function u(e,n){var o=n.path||"./",a=n.pkg||"default",u=r(e);if(u&&(o="./",a=u[0],n.v&&n.v[a]&&(a=a+"@"+n.v[a]),e=u[1]),e)if(126===e.charCodeAt(0))e=e.slice(2,e.length),o="./";else if(!m&&(47===e.charCodeAt(0)||58===e.charCodeAt(1)))return f(e);var s=x[a];if(!s){if(m&&"electron"!==_.target)throw"Package not found "+a;return f(a+(e?"/"+e:""))}e=e?e:"./"+s.s.entry;var l,d=t(o,e),c=i(d),p=s.f[c];return!p&&c.indexOf("*")>-1&&(l=c),p||l||(c=t(d,"/","index.js"),p=s.f[c],p||"."!==d||(c=s.s&&s.s.entry||"index.js",p=s.f[c]),p||(c=d+".js",p=s.f[c]),p||(p=s.f[d+".jsx"]),p||(c=d+"/index.jsx",p=s.f[c])),{file:p,wildcard:l,pkgName:a,versions:s.v,filePath:d,validPath:c}}function s(e,r,n){if(void 0===n&&(n={}),!m)return r(/\.(js|json)$/.test(e)?h.require(e):"");if(n&&n.ajaxed===e)return console.error(e,"does not provide a module");var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var n=i.getResponseHeader("Content-Type"),o=i.responseText;/json/.test(n)?o="module.exports = "+o:/javascript/.test(n)||(o="module.exports = "+JSON.stringify(o));var a=t("./",e);_.dynamic(a,o),r(_.import(e,{ajaxed:e}))}else console.error(e,"not found on request"),r(void 0)},i.open("GET",e,!0),i.send()}function l(e,r){var n=y[e];if(n)for(var t in n){var i=n[t].apply(null,r);if(i===!1)return!1}}function d(e){if(null!==e&&["function","object","array"].indexOf(typeof e)!==-1&&!e.hasOwnProperty("default"))return Object.isFrozen(e)?void(e.default=e):void Object.defineProperty(e,"default",{value:e,writable:!0,enumerable:!1})}function c(e,r){if(void 0===r&&(r={}),58===e.charCodeAt(4)||58===e.charCodeAt(5))return o(e);var t=u(e,r);if(t.server)return t.server;var i=t.file;if(t.wildcard){var a=new RegExp(t.wildcard.replace(/\*/g,"@").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&").replace(/@@/g,".*").replace(/@/g,"[a-z0-9$_-]+"),"i"),f=x[t.pkgName];if(f){var p={};for(var v in f.f)a.test(v)&&(p[v]=c(t.pkgName+"/"+v));return p}}if(!i){var g="function"==typeof r,y=l("async",[e,r]);if(y===!1)return;return s(e,function(e){return g?r(e):null},r)}var w=t.pkgName;if(i.locals&&i.locals.module)return i.locals.module.exports;var b=i.locals={},j=n(t.validPath);b.exports={},b.module={exports:b.exports},b.require=function(e,r){var n=c(e,{pkg:w,path:j,v:t.versions});return _.sdep&&d(n),n},m||!h.require.main?b.require.main={filename:"./",paths:[]}:b.require.main=h.require.main;var k=[b.module.exports,b.require,b.module,t.validPath,j,w];return l("before-import",k),i.fn.apply(k[0],k),l("after-import",k),b.module.exports}if(e.FuseBox)return e.FuseBox;var p="undefined"!=typeof ServiceWorkerGlobalScope,v="undefined"!=typeof WorkerGlobalScope,m="undefined"!=typeof window&&"undefined"!=typeof window.navigator||v||p,h=m?v||p?{}:window:global;m&&(h.global=v||p?{}:window),e=m&&"undefined"==typeof __fbx__dnm__?e:module.exports;var g=m?v||p?{}:window.__fsbx__=window.__fsbx__||{}:h.$fsbx=h.$fsbx||{};m||(h.require=require);var x=g.p=g.p||{},y=g.e=g.e||{},_=function(){function r(){}return r.global=function(e,r){return void 0===r?h[e]:void(h[e]=r)},r.import=function(e,r){return c(e,r)},r.on=function(e,r){y[e]=y[e]||[],y[e].push(r)},r.exists=function(e){try{var r=u(e,{});return void 0!==r.file}catch(e){return!1}},r.remove=function(e){var r=u(e,{}),n=x[r.pkgName];n&&n.f[r.validPath]&&delete n.f[r.validPath]},r.main=function(e){return this.mainFile=e,r.import(e,{})},r.expose=function(r){var n=function(n){var t=r[n].alias,i=c(r[n].pkg);"*"===t?a(i,function(r,n){return e[r]=n}):"object"==typeof t?a(t,function(r,n){return e[n]=i[r]}):e[t]=i};for(var t in r)n(t)},r.dynamic=function(r,n,t){this.pkg(t&&t.pkg||"default",{},function(t){t.file(r,function(r,t,i,o,a){var f=new Function("__fbx__dnm__","exports","require","module","__filename","__dirname","__root__",n);f(!0,r,t,i,o,a,e)})})},r.flush=function(e){var r=x.default;for(var n in r.f)e&&!e(n)||delete r.f[n].locals},r.pkg=function(e,r,n){if(x[e])return n(x[e].s);var t=x[e]={};return t.f={},t.v=r,t.s={file:function(e,r){return t.f[e]={fn:r}}},n(t.s)},r.addPlugin=function(e){this.plugins.push(e)},r.packages=x,r.isBrowser=m,r.isServer=!m,r.plugins=[],r}();return m||(h.FuseBox=_),e.FuseBox=_}(this))
//# sourceMappingURL=react-slct.js.map?tm=1574771081283