/**
 * BLOCK: service
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
	var BlockControls = wp.editor.BlockControls;
	var MediaUpload = wp.editor.MediaUpload;
	var InspectorControls = wp.editor.InspectorControls;
	var TextControl = wp.components.TextControl;
	var ColorPalette = wp.components.ColorPalette;

	const icon = el('svg', { width: 20, height: 20, viewBox: '0 0 24 24' },
		el('path', { d: "M 2 2 L 2 4 L 22 4 L 22 2 Z M 4 6 C 2.898438 6 2 6.898438 2 8 L 2 10 C 2 11.101563 2.898438 12 4 12 L 6 12 C 7.101563 12 8 11.101563 8 10 L 8 8 C 8 6.898438 7.101563 6 6 6 Z M 10 6 L 10 8 L 21 8 L 21 6 Z M 10 10 L 10 12 L 19 12 L 19 10 Z M 4 15 C 2.898438 15 2 15.898438 2 17 L 2 19 C 2 20.101563 2.898438 21 4 21 L 6 21 C 7.101563 21 8 20.101563 8 19 L 8 17 C 8 15.898438 7.101563 15 6 15 Z M 10 15 L 10 17 L 21 17 L 21 15 Z M 10 19 L 10 21 L 19 21 L 19 19 Z " } )
	);

	registerBlockType( 'absolutte-blocks/service', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		title: i18n.__( 'AB - Service' ), // The title of our block.
		description: i18n.__( 'A custom block for displaying personal profiles.' ), // The description of our block.
		icon: icon, // Dashicon icon for our block. Custom icons can be added using inline SVGs.
		category: 'common', // The category of the block.
		attributes: { // Necessary for saving block content.
			title: {
				type: 'array',
				source: 'children',
				selector: 'h4',
			},
			content: {
				type: 'array',
				source: 'children',
				selector: 'p',
			},
			mediaID: {
				type: 'number',
			},
			iconURL: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			},
			linkContent: {
				source: 'html',
				selector: 'a',
			},
			linkURL: {
				type: 'url',
			},
			iconBackgroundColor: {
				type: 'string',
				default: '#d9f3bd'
			},
			idAttr: {
				type: 'string',
			},
		},

		edit: function( props ) {

			var attributes = props.attributes;

			var onSelectImage = function( media ) {
				return props.setAttributes( {
					iconURL: media.url,
					mediaID: media.id,
				} );
			};

			var onBackgroundColorChange = function( changes ) {
				return props.setAttributes( {
					iconBackgroundColor: changes
				} );
			};

			return [
				el( BlockControls, { key: 'controls' }, // Display controls when the block is clicked on.
					el( 'div', { className: 'components-toolbar' },
						el( MediaUpload, {
							onSelect: onSelectImage,
							type: 'image',
							render: function( obj ) {
								return el( components.Button, {
									className: 'components-icon-button components-toolbar__control',
									onClick: obj.open
									},
									el( 'svg', { className: 'dashicon dashicons-edit', width: '20', height: '20' },
										el( 'path', { d: "M2.25 1h15.5c.69 0 1.25.56 1.25 1.25v15.5c0 .69-.56 1.25-1.25 1.25H2.25C1.56 19 1 18.44 1 17.75V2.25C1 1.56 1.56 1 2.25 1zM17 17V3H3v14h14zM10 6c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm3 5s0-6 3-6v10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V8c2 0 3 4 3 4s1-3 3-3 3 2 3 2z" } )
									)
								);
							}
						} )
					),
				),
				el( InspectorControls, { key: 'inspector' }, // Display the block options in the inspector panel.
					el( components.PanelBody, {
						title: i18n.__( 'Attributes' ),
						className: 'block-attributes',
						initialOpen: true,
					},
						el( 'p', {}, i18n.__( 'Add links to your social media profiles.' ) ),
						el( TextControl, {
							type: 'url',
							label: i18n.__( 'Link URL' ),
							value: attributes.linkURL,
							onChange: function( newLinkURL ) {
								props.setAttributes( { linkURL: newLinkURL } );
							},
						} ),
						el( MediaUpload, {
							onSelect: onSelectImage,
							type: 'image',
							render: function( obj ) {
								return el( components.Button, {
									className: 'components-icon-button components-toolbar__control',
									onClick: obj.open
									},
									el( 'svg', { className: 'dashicon dashicons-edit', width: '20', height: '20' },
										el( 'path', { d: "M2.25 1h15.5c.69 0 1.25.56 1.25 1.25v15.5c0 .69-.56 1.25-1.25 1.25H2.25C1.56 19 1 18.44 1 17.75V2.25C1 1.56 1.56 1 2.25 1zM17 17V3H3v14h14zM10 6c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm3 5s0-6 3-6v10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V8c2 0 3 4 3 4s1-3 3-3 3 2 3 2z" } )
									)
								);
							}
						} ),
					),
					el( 'p', {}, i18n.__( 'Icon Background color' ) ),
					el( ColorPalette, {
						label: i18n.__( 'Icon Background color' ),
						onChange: onBackgroundColorChange,
						value: attributes.iconBackgroundColor,
					} ),
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

				el( 'div', { className: props.className + ' absolutte-service', id: attributes.idAttr }, 
					el( 'div', { className: 'absolutte-service-icon-wrap', style: { backgroundColor: attributes.iconBackgroundColor } }, 
						el( MediaUpload, {
								onSelect: onSelectImage,
								type: 'image',
								value: attributes.mediaID,
								className: 'absolutte-service-icon',
								render: function( obj ) {
									return el( components.Button, {
											className: attributes.mediaID ? 'image-button' : 'button button-large',
											onClick: obj.open
										},
										! attributes.mediaID ? i18n.__( 'Upload Image' ) : el( 'img', { src: attributes.iconURL, className: 'absolutte-service-icon' } )
									);
								}
							} 
						),
					),

					el( 'div', { className: 'absolutte-service-content-wrap' }, 
						el( RichText, {
								tagName: 'h4',
								className: 'absolutte-service-title',
								placeholder: i18n.__( 'Title' ),
								keepPlaceholderOnFocus: true,
								value: attributes.title,
								isSelected: false,
								onChange: function( newTitle ) {
									props.setAttributes( { title: newTitle } );
								},
							} 
						),
						el( 'div', { className: 'absolutte-service-content' }, 
							el( RichText, {
									tagName: 'p',
									placeholder: 'Description',
									keepPlaceholderOnFocus: true,
									value: attributes.content,
									isSelected: false,
									onChange: function( newContent ) {
										props.setAttributes( { content: newContent } );
									},
								} 
							),
						),
						el( 'div', { className: 'absolutte-service-action' }, 
							el( RichText, {
									tagName: 'a',
									className: 'absolutte-button-arrow',
									placeholder: 'Learn More',
									keepPlaceholderOnFocus: true,
									value: attributes.linkContent,
									isSelected: false,
									onChange: function( newLinkContent ) {
										props.setAttributes( { linkContent: newLinkContent } );
									},
								} 
							),
						),
					),
				),
				
			];
		},

		save: function( props ) {
			var attributes = props.attributes;

			return (
				el( 'div', {
					className: props.className + ' absolutte-service', 
					id: attributes.idAttr 
				},
					el( 'div', {
							className: 'absolutte-service-icon-wrap',
							style: { backgroundColor: attributes.iconBackgroundColor }
						},
						el( 'img', {
							className: 'absolutte-service-icon',
							src: attributes.iconURL
						} ),
					),
					el( 'div', { className: 'absolutte-service-content-wrap' },
						el( RichText.Content, {
							tagName: 'h4',
							className: 'absolutte-service-title',
							value: attributes.title
						} ),
						el( RichText.Content, {
							tagName: 'p',
							value: attributes.content
						} ),
					),
					el( 'div', { className: 'absolutte-service-action' },
						el( 'a', { href: attributes.linkURL, className: 'absolutte-button-arrow', },
							 ( attributes.linkContent )
						),
					),
				)
			);
		},
	} );

} )(
	window.wp.editor,
	window.wp.components,
	window.wp.i18n,
	window.wp.element,
);