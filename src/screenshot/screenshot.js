/**
 * BLOCK: screenshot
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
	var MediaUpload = wp.editor.MediaUpload;
	var InspectorControls = wp.editor.InspectorControls;
	var TextControl = wp.components.TextControl;
	var ColorPalette = wp.components.ColorPalette;

	const icon = el('svg', { width: 20, height: 20, viewBox: '0 0 24 24' },
		el('path', { d: "M16.5,1h-9C6.12,1,5,2.12,5,3.5v17C5,21.88,6.12,23,7.5,23h9c1.38,0,2.5-1.12,2.5-2.5v-17C19,2.12,17.88,1,16.5,1z M12,21.125c-0.622,0-1.125-0.503-1.125-1.125s0.503-1.125,1.125-1.125s1.125,0.503,1.125,1.125S12.622,21.125,12,21.125z M17,18H7 V4h10V18z" } )
	);

	registerBlockType( 'absolutte-blocks/screenshot', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		title: i18n.__( 'AB - Screenshot Section' ), // The title of our block.
		description: i18n.__( 'Displays a phone mockup with a screenshot and text.' ), // The description of our block.
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
			checklist: {
				type: 'array',
				source: 'children',
				selector: 'ul.absolutte-screenshot-bullets',
			},
			mediaID: {
				type: 'number',
			},
			imageURL: {
				type: 'string',
			},
			sectionBackgroundColor: {
				type: 'string',
				default: '#272d61'
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
				el( 'div', { className: props.className + ' absolutte-section-screenshot absolutte-section', id: attributes.idAttr, style:{
					backgroundColor: attributes.sectionBackgroundColor
				} },
					el( 'div', { className: 'container' },
						el( 'div', { className: 'row' },
							el( 'div', { className: 'col-12 col-sm-6 absolutte-track' },
								el( 'div', { className: 'absolutte-screenshot-mockup-wrap' },
									el( 'div', { className: 'absolutte-screenshot-mockup absolutte-phone-mockup' },
										el( 'div', { className: 'absolutte-phone-mockup-image', style: { backgroundImage: `url('${ attributes.imageURL }')` } }, 
											el( MediaUpload, {
													onSelect: onSelectImage,
													type: 'image',
													value: attributes.mediaID,
													render: function( obj ) {
														return el( components.Button, {
																className: attributes.mediaID ? 'image-button' : 'button button-large',
																onClick: obj.open
															},
															i18n.__( 'Upload Image' )
														);
													}
												} 
											),
										),
									),
								),
							),
							el( 'div', { className: 'col-12 col-sm-6 absolutte-track' },

									el( RichText, {
											tagName: 'h3',
											className: 'absolutte-screenshot-title absolutte-section-title',
											placeholder: i18n.__( 'Title' ),
											keepPlaceholderOnFocus: true,
											value: attributes.title,
											isSelected: false,
											onChange: function( newTitle ) {
												props.setAttributes( { title: newTitle } );
											},
										} 
									),
									el( 'div', { className: 'absolutte-screenshot-text' },
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
									el( RichText, {
											tagName: 'ul',
											className: 'absolutte-screenshot-bullets',
											placeholder: i18n.__( 'Check list' ),
											keepPlaceholderOnFocus: true,
											value: attributes.checklist,
											isSelected: false,
											multiline: 'li',
											onChange: function( newSubTitle ) {
												props.setAttributes( { checklist: newSubTitle } );
											},
										} 
									),
							),							
						),
					),
					(
						<div className="absolutte-diagonal-top"><svg viewBox="0 0 1440 50"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g  fill="#FFFFFF" fill-rule="nonzero"><polygon points="1440 50 1440 0 0 0"></polygon></g></g></svg></div>
					),
					(
            			<div className="absolutte-diagonal-bottom"><svg viewBox="0 0 1440 70"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(0.000000, -528.000000)" fill="#FFFFFF"><polygon id="diagonal" points="0 528 1440 598 0 598"></polygon></g></g></svg></div>
					),
				),
				
			];
		},

		save: function( props ) {
			var attributes = props.attributes;

			return (
				<div className={ props.className + ' absolutte-section-screenshot absolutte-section' } id={ attributes.idAttr } style={ {
					backgroundColor: attributes.sectionBackgroundColor
				} }>

					<div className="container">
						<div className="row">
							<div className="col-12 col-sm-6 absolutte-track" data-animation="fadeInUp">
								<div className="absolutte-screenshot-mockup-wrap">
									<div className="absolutte-screenshot-mockup absolutte-phone-mockup">
										<div className="absolutte-phone-mockup-image" style={ { backgroundImage: `url('${ attributes.imageURL }')` } }></div>
									</div>
								</div>

							</div>

							<div className="col-12 col-sm-6 absolutte-track" data-animation="fadeInUp">
								<h3 className="absolutte-screenshot-title absolutte-section-title">{ attributes.title }</h3>
								<div className="absolutte-screenshot-text">
									<p>{ attributes.subtitle }</p>
								</div>
								<ul className="absolutte-screenshot-bullets">
									{ attributes.checklist }
								</ul>
							</div>
						</div>
					</div>

					<div className="absolutte-diagonal-top"><svg viewBox="0 0 1440 50"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g  fill="#FFFFFF" fill-rule="nonzero"><polygon points="1440 50 1440 0 0 0"></polygon></g></g></svg></div>
					<div className="absolutte-diagonal-bottom"><svg viewBox="0 0 1440 70"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(0.000000, -528.000000)" fill="#FFFFFF"><polygon id="diagonal" points="0 528 1440 598 0 598"></polygon></g></g></svg></div>

				</div>
			);
		},
	} );

} )(
	window.wp.editor,
	window.wp.components,
	window.wp.i18n,
	window.wp.element,
);