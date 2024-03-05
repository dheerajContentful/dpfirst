// src/componentDefinitions/image.ts
import type { ComponentDefinition } from '@contentful/experience-builder';

export const imageComponentDefinition: ComponentDefinition = {
  // id of the component. It needs to be unique
  id: 'Image',
  // user friendly name of the component
  name: 'Image',
  // arbitrary string. Components with the same category will be grouped in the web app within the same expand/collapse group
  category: 'Components',
  variables: {
    // each key in the variables object needs to match the prop name of the component
    imageUrl: {
      // user friendly name of the variable
      displayName: 'ImageUrl',
      type: 'Text',
      defaultValue: 'https://picsum.photos/500',
    },
    width: {
      displayName: 'Width',
      type: 'Number',
      defaultValue: 500,
      // makes this variable appear only on Design tab. Disables ability to apply binding. This means that this variable is a purely visual customisation of the component and the value for it shouldn't be stored in entries/assets within Contentful
      group: 'style'
    },
    height: {
      displayName: 'Height',
      type: 'Number',
      defaultValue: 500,
      group: 'style',
    },
    altText: {
      type: 'Text',
      displayName: 'Alt Text',
      defaultValue: 'value2',
      group: 'style',
      // restricts the values to the pre-defined list of options
      validations: {
        in: [
          { value: 'value1', displayName: 'Parrots' },
          { value: 'value2', displayName: 'Alpaca' }
        ]
      }
    }
  }
}