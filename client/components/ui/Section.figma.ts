import figma from '@figma/code-connect';

/**
 * Figma Code Connect for Section components.
 *
 * Replace the placeholder URL below with your actual Figma component URL.
 * Then run: pnpm figma:publish
 *
 * See https://github.com/figma/code-connect for full docs.
 */

// TODO: Replace with actual Figma component URL
const FIGMA_SECTION_URL = 'https://figma.com/design/YOUR_FILE_ID/YOUR_FILE_NAME?node-id=SECTION_NODE_ID';

figma.connect(FIGMA_SECTION_URL, {
  props: {
    title: figma.string('Title'),
    description: figma.string('Description'),
    divider: figma.boolean('Divider'),
    collapsible: figma.boolean('Collapsible'),
    level: figma.enum('Level', {
      Primary: 'primary',
      Secondary: 'secondary',
      Tertiary: 'tertiary',
    }),
  },
  example: ({ title, description, divider, collapsible, level }) => {
    const Tag = level === 'primary'
      ? 'PrimarySection'
      : level === 'secondary'
        ? 'SecondarySection'
        : 'TertiarySection';

    return `<${Tag} title="${title}" description="${description}" divider={${divider}} collapsible={${collapsible}}>
  {children}
</${Tag}>`;
  },
});
