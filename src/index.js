import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/properties/properties';
import 'codemirror/mode/shell/shell';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/edit/closetag';

import React from 'react';
import { UnControlled as ReactCodeMirror } from 'react-codemirror2';
import PropTypes from 'prop-types';

const defaultOptions = {
  theme: 'eclipse',
  indentUnit: 2,
  smartIndent: true,
  tabSize: 2,
  indentWithTabs: false,
  electricChars: true,
  lineNumbers: true,
  inputStyle: 'contenteditable',
  lint: true,
  autoCloseBrackets: true,
  styleActiveLine: true,
  matchBrackets: true,
  lineWrapping: true,
  foldGutter: true,
  autoCloseTags: true,
  viewportMargin: Infinity,
  gutters: [
    'CodeMirror-lint-markers',
    'CodeMirror-foldgutter',
    'CodeMirror-linenumbers'
  ]
};

const mergeOptions = ({ mode, readOnly }) => {
  const modes = {
    json: {
      name: 'javascript',
      json: true
    },
    yaml: 'yaml',
    ini: 'properties',
    shell: 'shell',
    sh: 'shell'
  };

  return Object.assign({}, defaultOptions, {
    mode: modes[mode.toLowerCase()],
    readOnly
  });
};

const ManifestEditor = ({ value, defaultValue, onChange, ...rest }) => (
  <ReactCodeMirror
    value={value || defaultValue}
    onChange={onChange}
    options={mergeOptions(rest)}
  />
);

ManifestEditor.defaultProps = {
  mode: 'json',
  defaultValue: '',
  onChange: () => null,
  readOnly: false
};

ManifestEditor.propTypes = {
  mode: PropTypes.oneOf(['json', 'yaml', 'ini', 'sh', 'shell']),
  value: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool
};

export default ManifestEditor;
