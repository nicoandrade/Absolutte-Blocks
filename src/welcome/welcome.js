/**
 * BLOCK: welcome
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
	var AlignmentToolbar = wp.editor.AlignmentToolbar;
	var MediaUpload = wp.editor.MediaUpload;
	var InspectorControls = wp.editor.InspectorControls;
	var TextControl = wp.components.TextControl;
	var ColorPalette = wp.components.ColorPalette;

	const icon = el('svg', { width: 20, height: 20, viewBox: '0 0 24 24' },
		el('path', { d: "M 4 4 C 2.9069372 4 2 4.9069372 2 6 L 2 16 C 2 17.093063 2.9069372 18 4 18 L 0 18 L 0 20 L 24 20 L 24 18 L 20 18 C 21.093063 18 22 17.093063 22 16 L 22 6 C 22 4.9069372 21.093063 4 20 4 L 4 4 z M 4 6 L 20 6 L 20 16 L 4 16 L 4 6 z" } )
	);

	registerBlockType( 'absolutte-blocks/welcome', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		title: i18n.__( 'AB - Welcome Section' ), // The title of our block.
		description: i18n.__( 'Displays a welcome banner.' ), // The description of our block.
		icon: icon, // Dashicon icon for our block. Custom icons can be added using inline SVGs.
		category: 'common', // The category of the block.
		attributes: { // Necessary for saving block content.
			title: {
				type: 'array',
				source: 'children',
				selector: 'h2',
			},
			subtitle: {
				type: 'array',
				source: 'children',
				selector: 'p',
			},
			mediaID: {
				type: 'number',
			},
			imageURL: {
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
			backgroundColor: {
				type: 'string',
				default: '#76aafc'
			},
			backgroundColor2: {
				type: 'string',
				default: '#1236e3'
			},
			buttonBackgroundColor: {
				type: 'string',
				default: '#3acb7c'
			},
			computerImage: {
				type: 'string',
				default: absolutte_blocks.plugin_url + 'src/welcome/images/computer.png'
			},
			idAttr: {
				type: 'string',
			},
		},

		edit: function( props ) {

			var attributes = props.attributes;

			var onSelectImage = function( media ) {
				return props.setAttributes( {
					imageURL: media.url,
					mediaID: media.id,
				} );
			};

			var onBackgroundColorChange = function( changes ) {
				return props.setAttributes( {
					backgroundColor: changes
				} );
			};
			var onBackgroundColorChange2 = function( changes ) {
				return props.setAttributes( {
					backgroundColor2: changes
				} );
			};
			var onButtonBackgroundColorChange = function( changes ) {
				return props.setAttributes( {
					buttonBackgroundColor: changes
				} );
			};


			return [
				el( InspectorControls, { key: 'inspector' }, // Display the block options in the inspector panel.
					el( components.PanelBody, {
						title: i18n.__( 'Attributes' ),
						className: 'block-attributes',
						initialOpen: true,
					},
						el( 'p', {}, i18n.__( 'Main button options.' ) ),
						el( TextControl, {
							type: 'url',
							label: i18n.__( 'Link URL' ),
							value: attributes.linkURL,
							onChange: function( newLinkURL ) {
								props.setAttributes( { linkURL: newLinkURL } );
							},
						} ),
						el( 'p', {}, i18n.__( 'Button Background Color' ) ),
						el( ColorPalette, {
							onChange: onButtonBackgroundColorChange,
							value: attributes.buttonBackgroundColor,
						} ),
						el( 'p', {}, i18n.__( 'Background Gradients Colors.' ) ),
						el( ColorPalette, {
							label: i18n.__( 'Gradient Color 1' ),
							onChange: onBackgroundColorChange,
							value: attributes.backgroundColor,
						} ),
						el( ColorPalette, {
							label: i18n.__( 'Gradient Color 2' ),
							onChange: onBackgroundColorChange2,
							value: attributes.backgroundColor2,
						} ),
					),
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

				el( 'div', { className: props.className + ' absolutte-section-welcome absolutte-section', style: { background: `linear-gradient(135deg, ${ attributes.backgroundColor } 0%, ${ attributes.backgroundColor2 } 100%)` } }, 
					el( RichText, {
							tagName: 'h2',
							className: 'absolutte-welcome-title',
							placeholder: i18n.__( 'Title' ),
							keepPlaceholderOnFocus: true,
							value: attributes.title,
							isSelected: false,
							onChange: function( newTitle ) {
								props.setAttributes( { title: newTitle } );
							},
						} 
					),
					el( RichText, {
							tagName: 'p',
							className: 'absolutte-welcome-desc',
							placeholder: i18n.__( 'Sub title' ),
							keepPlaceholderOnFocus: true,
							value: attributes.subtitle,
							isSelected: false,
							onChange: function( newSubTitle ) {
								props.setAttributes( { subtitle: newSubTitle } );
							},
						} 
					),
					el( 'div', {},
						el( RichText, {
								tagName: 'a',
								className: 'absolutte-welcome-button absolutte-button',
								href: attributes.linkURL,
								style: { backgroundColor: attributes.buttonBackgroundColor },
								keepPlaceholderOnFocus: true,
								value: attributes.linkContent,
								isSelected: false,
								onChange: function( newLinkContent ) {
									props.setAttributes( { linkContent: newLinkContent } );
								},
							} 
						),
					),
					el( 'div', { className: 'absolutte-welcome-mockup' }, 
						el( 'div', { className: 'absolutte-welcome-mockup-screen' }, 
							el( MediaUpload, {
									onSelect: onSelectImage,
									type: 'image',
									value: attributes.mediaID,
									className: 'absolutte-welcome-icon',
									render: function( obj ) {
										return el( components.Button, {
												className: attributes.mediaID ? 'image-button' : 'button button-large',
												onClick: obj.open
											},
											! attributes.mediaID ? i18n.__( 'Upload Image' ) : el( 'img', { src: attributes.imageURL, className: 'absolutte-service-icon' } )
										);
									}
								} 
							),
						),
						el( 'img', { className: 'absolutte-welcome-device', src: attributes.computerImage } )
					),
					(
						<div>
							<div className="absolutte-diagonal-bottom"><svg viewBox="0 0 1440 70"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(0.000000, -528.000000)" fill="#FFFFFF"><polygon id="diagonal" points="0 528 1440 598 0 598"></polygon></g></g></svg></div>
						</div>
					),
				),
				
			];
		},

		save: function( props ) {
			var attributes = props.attributes;

			return (
				el( 'div', {
					className: props.className + ' absolutte-section-welcome absolutte-section'
				},

					(
						<div>
							<h2 className="absolutte-welcome-title absolutte-track" data-animation="absoluteFadeInUp">{ attributes.title }</h2>
							<p className="absolutte-welcome-desc absolutte-track" data-animation="absoluteFadeInUp">{ attributes.subtitle }</p>

							{ attributes.linkContent ? 
							<div className="absolutte-track" data-animation="absoluteFadeInUp"><a href={ attributes.linkURL } className="absolutte-welcome-button absolutte-button" style={ { backgroundColor: attributes.buttonBackgroundColor } }>{ attributes.linkContent }</a></div>
							: null }
							
						</div>
					),
					(
						<div className="absolutte-welcome-mockup absolutte-track" data-animation="fadeInUp">
							<div className="absolutte-welcome-mockup-screen">
								<img src={ attributes.imageURL } />
							</div>
							<img className="absolutte-welcome-device" src={ attributes.computerImage } />

						</div>
					),
					(
						<div>
							<div className="absolutte-diagonal-bottom"><svg viewBox="0 0 1440 70"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(0.000000, -528.000000)" fill="#FFFFFF"><polygon id="diagonal" points="0 528 1440 598 0 598"></polygon></g></g></svg></div>
						</div>
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