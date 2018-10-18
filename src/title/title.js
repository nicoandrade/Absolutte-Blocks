/**
 * BLOCK: title
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

( function( editor, components, i18n, element ) {
	var el = element.createElement;
	var registerBlockType = wp.blocks.registerBlockType;
	var RichText = wp.editor.RichText;

	const icon = el('svg', { width: 20, height: 20, viewBox: '0 0 24 24' },
		el('path', { d: "M 20 7 L 14 7 L 14 21 L 10 21 L 10 7 L 4 7 L 4 4 L 20 4 Z " } )
	);

	registerBlockType( 'absolutte-blocks/title', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		title: i18n.__( 'AB - Title Section' ), // The title of our block.
		description: i18n.__( 'Displays a section title.' ), // The description of our block.
		icon: icon, // Dashicon icon for our block. Custom icons can be added using inline SVGs.
		category: 'common', // The category of the block.
		attributes: { // Necessary for saving block content.
			title: {
				type: 'array',
				source: 'children',
				selector: 'h3',
			},
			idAttr: {
				type: 'string',
			},
		},

		edit: function( props ) {

			var attributes = props.attributes;

			return [
				el( InspectorControls, { key: 'inspector' }, // Display the block options in the inspector panel.
					el( components.PanelBody, {
						title: i18n.__( 'ID Attribute' ),
						className: 'id-attribute',
						initialOpen: false,
					},
						el( TextControl, {
							type: 'string',
							label: i18n.__( 'ID Attribute' ),
							value: attributes.idAttr,
							onChange: function( newID ) {
								props.setAttributes( { idAttr: newID } );
							},
						} ),
					),
				),
				el( RichText, {
						tagName: 'h3',
						className: 'absolutte-pricing-title absolutte-section-title-small',
						id: attributes.idAttr,
						placeholder: i18n.__( 'Title' ),
						keepPlaceholderOnFocus: true,
						value: attributes.title,
						isSelected: false,
						onChange: function( newTitle ) {
							props.setAttributes( { title: newTitle } );
						},
					} 
				),				
			];
		},

		save: function( props ) {
			var attributes = props.attributes;

			return (
				<h3 className={ props.className + ' absolutte-pricing-title absolutte-section-title-small' } id={ attributes.idAttr }>{ attributes.title }</h3>
			);
		},
	} );

} )(
	window.wp.editor,
	window.wp.components,
	window.wp.i18n,
	window.wp.element,
);