/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * The purpose of this file is to centalize theme configuration so it can be used across server,
 * client, and dev tooling. DO NOT add dependencies that wouldn't operate in all of these contexts.
 *
 * Default theme is specified in the uiSettings schema.
 */

const THEME_MODES = ['light', 'dark'];
const THEME_VERSION_LABEL_MAP = {
  v7: 'v7',
  v8: 'Next (preview)',
  v9: 'v9 (preview)',
};
const THEME_VERSION_VALUE_MAP = {
  // allow version lookup by label ...
  ...Object.fromEntries(Object.entries(THEME_VERSION_LABEL_MAP).map((a) => a.reverse())),
  // ... or by the version itself
  ...Object.fromEntries(Object.keys(THEME_VERSION_LABEL_MAP).map((v) => [v, v])),
};
const THEME_VERSIONS = Object.keys(THEME_VERSION_LABEL_MAP);
const THEME_TAGS = THEME_VERSIONS.flatMap((v) => THEME_MODES.map((m) => `${v}${m}`));

// Setup theme options to be backwards compatible with the fact that v8 was persisted with its
// label rather than with the correct themeVersion value
const THEME_SCHEMA_VALUES = THEME_VERSIONS.concat(THEME_VERSION_LABEL_MAP.v8);
const THEME_OPTIONS = THEME_VERSIONS.map((v) => (v !== 'v8' ? v : THEME_VERSION_LABEL_MAP.v8));

exports.themeVersionLabelMap = THEME_VERSION_LABEL_MAP;

exports.themeVersionValueMap = THEME_VERSION_VALUE_MAP;

exports.themeTags = THEME_TAGS;

exports.themeSchemaValues = THEME_SCHEMA_VALUES;

exports.themeOptions = THEME_OPTIONS;

exports.themeCssDistFilenames = THEME_VERSIONS.reduce((map, v) => {
  map[v] = THEME_MODES.reduce((acc, m) => {
    acc[m] = `osd-ui-shared-deps.${v}.${m}.css`;
    return acc;
  }, {});
  return map;
}, {});

exports.kuiCssDistFilenames = {
  v7: { dark: 'kui_dark.css', light: 'kui_light.css' },
  v8: { dark: 'kui_next_dark.css', light: 'kui_next_light.css' },
  v9: { dark: 'kui_v9_dark.css', light: 'kui_v9_light.css' },
};
