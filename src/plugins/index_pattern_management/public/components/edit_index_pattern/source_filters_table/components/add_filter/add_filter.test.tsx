/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { shallow } from 'enzyme';

import { AddFilter } from './add_filter';

describe('AddFilter', () => {
  test('should render normally', () => {
    const component = shallow(<AddFilter useUpdatedUX onAddFilter={() => {}} />);

    expect(component).toMatchSnapshot();
  });

  test('should match snapshot when useUpdatedUX equal false', () => {
    const component = shallow(<AddFilter useUpdatedUX={false} onAddFilter={() => {}} />);

    expect(component).toMatchSnapshot();
  });

  test('should allow adding a filter', async () => {
    const onAddFilter = jest.fn();
    const component = shallow(<AddFilter useUpdatedUX onAddFilter={onAddFilter} />);

    component.find('EuiCompressedFieldText').simulate('change', { target: { value: 'tim*' } });
    component.find('EuiSmallButton').simulate('click');
    component.update();

    expect(onAddFilter).toBeCalledWith('tim*');
  });

  test('should ignore strings with just spaces', () => {
    const component = shallow(<AddFilter useUpdatedUX onAddFilter={() => {}} />);

    // Set a value in the input field
    component.find('EuiCompressedFieldText').simulate('keypress', ' ');
    component.update();

    expect(component).toMatchSnapshot();
  });
});
