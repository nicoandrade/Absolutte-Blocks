/**
 * BLOCK: video
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
		el('path', { d: "M7,2l12,11.2l-5.8,0.5l3.3,7.3l-2.2,1l-3.2-7.4L7,18.5V2" } )
	);

	registerBlockType( 'absolutte-blocks/cta', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		title: i18n.__( 'AB - Call To Action' ), // The title of our block.
		description: i18n.__( 'Displays a call to action banner.' ), // The description of our block.
		icon: icon, // Dashicon icon for our block. Custom icons can be added using inline SVGs.
		category: 'common', // The category of the block.
		attributes: { // Necessary for saving block content.
			title: {
				type: 'array',
				source: 'children',
				selector: 'h3',
			},
			subtitle: {
				type: 'array',
				source: 'children',
				selector: 'p',
			},
			buttonPrimaryContent: {
				source: 'html',
				selector: 'a.absolutte-cta-primary-btn',
			},
			button1URL: {
				type: 'string',
			},
			buttonSecondaryContent: {
				source: 'html',
				selector: 'a.absolutte-cta-secundary-btn',
			},
			button2URL: {
				type: 'string',
			},
			buttonBackgroundColor: {
				type: 'string',
				default: '#3acb7c'
			},
			sectionBackgroundColor: {
				type: 'string',
				default: '#f8f9fa'
			},
			idAttr: {
				type: 'string',
			},
		},

		edit: function( props ) {

			var attributes = props.attributes;

			var onButtonBackgroundColorChange = function( changes ) {
				return props.setAttributes( {
					buttonBackgroundColor: changes
				} );
			};
			var onSectionBackgroundColorChange = function( changes ) {
				return props.setAttributes( {
					sectionBackgroundColor: changes
				} );
			};


			return [
				el( InspectorControls, { key: 'inspector' }, // Display the block options in the inspector panel.
					el( components.PanelBody, {
						title: i18n.__( 'Attributes' ),
						className: 'block-attributes',
						initialOpen: true,
					},
						el( TextControl, {
							type: 'url',
							label: i18n.__( 'Button 1 URL' ),
							value: attributes.button1URL,
							onChange: function( newButtonURL ) {
								props.setAttributes( { button1URL: newButtonURL } );
							},
						} ),
						el( 'p', {}, i18n.__( 'Button 1 Background Color' ) ),
						el( ColorPalette, {
							onChange: onButtonBackgroundColorChange,
							value: attributes.buttonBackgroundColor,
						} ),
						el( TextControl, {
							type: 'url',
							label: i18n.__( 'Button 2 URL' ),
							value: attributes.button2URL,
							onChange: function( newButtonURL ) {
								props.setAttributes( { button2URL: newButtonURL } );
							},
						} ),
						el( 'p', {}, i18n.__( 'Section Background Color' ) ),
						el( ColorPalette, {
							onChange: onSectionBackgroundColorChange,
							value: attributes.sectionBackgroundColor,
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

				el( 'div', { className: props.className + ' absolutte-section-cta absolutte-section', style:{
						backgroundColor: attributes.sectionBackgroundColor
					}, id: attributes.idAttr },
					el( 'div', { className: 'absolutte-cta absolutte-track' },
						el( 'div', { className: 'absolutte-cta-content' }, 
							el( RichText, {
									tagName: 'h3',
									className: 'absolutte-cta-title',
									placeholder: i18n.__( 'Title' ),
									keepPlaceholderOnFocus: true,
									value: attributes.title,
									isSelected: false,
									style: { color: attributes.titleColor },
									onChange: function( newTitle ) {
										props.setAttributes( { title: newTitle } );
									},
								} 
							),
							el( 'div', { className: 'absolutte-cta-text' }, 
								el( RichText, {
										tagName: 'p',
										placeholder: i18n.__( 'Sub title' ),
										keepPlaceholderOnFocus: true,
										value: attributes.subtitle,
										isSelected: false,
										onChange: function( newSubTitle ) {
											props.setAttributes( { subtitle: newSubTitle } );
										},
									} 
								),
							),
						),
						el( 'div', { className: 'absolutte-cta-buttons' }, 
							el( RichText, {
									tagName: 'a',
									className: 'absolutte-cta-primary-btn absolutte-button',
									href: attributes.button1URL,
									style: { backgroundColor: attributes.buttonBackgroundColor },
									keepPlaceholderOnFocus: true,
									value: attributes.buttonPrimaryContent,
									isSelected: false,
									onChange: function( newLinkContent ) {
										props.setAttributes( { buttonPrimaryContent: newLinkContent } );
									},
								}
							),
							el( RichText, {
									tagName: 'a',
									className: 'absolutte-cta-secundary-btn absolutte-button-secondary',
									href: attributes.button2URL,
									keepPlaceholderOnFocus: true,
									value: attributes.buttonSecondaryContent,
									isSelected: false,
									onChange: function( newLink2Content ) {
										props.setAttributes( { buttonSecondaryContent: newLink2Content } );
									},
								} 
							),
						),
						
					),
					(
						<div className="absolutte-diagonal-top"><svg viewBox="0 0 1440 50"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g  fill="#FFFFFF" fill-rule="nonzero"><polygon points="1440 50 1440 0 0 0"></polygon></g></g></svg></div>
					),
					(
            			<div className="absolutte-diagonal-bottom"><svg viewBox="0 0 1440 70"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(0.000000, -528.000000)" fill="#FFFFFF"><polygon id="diagonal" points="0 528 1440 598 0 598"></polygon></g></g></svg></div>
					)
				),
			];
		},

		save: function( props ) {
			var attributes = props.attributes;

			return (
				el( 'div', {
						className: props.className + ' absolutte-section-cta absolutte-section',
						id: attributes.idAttr,
						style:{
							backgroundColor: attributes.sectionBackgroundColor
						}
					},
					(
						<div className="absolutte-cta absolutte-track" data-animation="fadeInUp">
							<div className="absolutte-cta-content">
								<h3 className="absolutte-cta-title">{ attributes.title }</h3>
								<div className="absolutte-cta-text">
									<p>{ attributes.subtitle }</p>
								</div>

							</div>
							<div className="absolutte-cta-buttons">
								<a href={ attributes.button1URL } className="absolutte-cta-primary-btn absolutte-button" style={ { backgroundColor: attributes.buttonBackgroundColor } }>{ attributes.buttonPrimaryContent }</a>

								{ attributes.buttonSecondaryContent ? 
									<a href={ attributes.button2URL } className="absolutte-cta-secundary-btn absolutte-button-secondary">{ attributes.buttonSecondaryContent }</a>
								: null }
							</div>
						</div>
					),
					(
						<div className="absolutte-diagonal-top"><svg viewBox="0 0 1440 50"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g  fill="#FFFFFF" fill-rule="nonzero"><polygon points="1440 50 1440 0 0 0"></polygon></g></g></svg></div>
					),
					(
            			<div className="absolutte-diagonal-bottom"><svg viewBox="0 0 1440 70"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(0.000000, -528.000000)" fill="#FFFFFF"><polygon id="diagonal" points="0 528 1440 598 0 598"></polygon></g></g></svg></div>
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