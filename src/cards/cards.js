/**
 * BLOCK: cards
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
		el('path', { d: "M 4 3 C 2.90625 3 2 3.90625 2 5 L 2 19 C 2 20.09375 2.90625 21 4 21 L 20 21 C 21.09375 21 22 20.09375 22 19 L 22 5 C 22 3.90625 21.09375 3 20 3 Z M 4 7 L 20 7 L 20 19 L 4 19 Z M 6 9 L 6 11 L 18 11 L 18 9 Z M 6 12 L 6 14 L 8 14 L 8 12 Z M 9 12 L 9 14 L 18 14 L 18 12 Z M 6 15 L 6 17 L 8 17 L 8 15 Z M 9 15 L 9 17 L 18 17 L 18 15 Z " } )
	);

	registerBlockType( 'absolutte-blocks/cards', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		title: i18n.__( 'AB - Cards Section' ), // The title of our block.
		description: i18n.__( 'Displays cards with images and text.' ), // The description of our block.
		icon: icon, // Dashicon icon for our block. Custom icons can be added using inline SVGs.
		category: 'common', // The category of the block.
		attributes: { // Necessary for saving block content.
			title1: {
				type: 'array',
				source: 'children',
				selector: '.absolutte-card-title1',
			},
			content1: {
				type: 'array',
				source: 'children',
				selector: '.absolutte-card-text1',
			},
			mediaID1: {
				type: 'number',
			},
			imageURL1: {
				type: 'string',
			},
			title2: {
				type: 'array',
				source: 'children',
				selector: '.absolutte-card-title2',
			},
			content2: {
				type: 'array',
				source: 'children',
				selector: '.absolutte-card-text2',
			},
			mediaID2: {
				type: 'number',
			},
			imageURL2: {
				type: 'string',
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

			var onSelectImage1 = function( media ) {
				return props.setAttributes( {
					imageURL1: media.url,
					mediaID1: media.id,
				} );
			};
			var onSelectImage2 = function( media ) {
				return props.setAttributes( {
					imageURL2: media.url,
					mediaID2: media.id,
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
				el( 'div', { className: props.className + ' absolutte-section-cards absolutte-section', id: attributes.idAttr, style:{
					backgroundColor: attributes.sectionBackgroundColor
				} },
					el( 'div', { className: 'container' },
						el( 'div', { className: 'row' },

							el( 'div', { className: 'col-12 col-lg-6' },
								el( 'div', { className: 'absolutte-card absolutte-track' },
									el( 'div', { className: 'absolutte-card-image' , style: { backgroundImage: `url('${ attributes.imageURL1 }')` } },
										el( MediaUpload, {
												onSelect: onSelectImage1,
												type: 'image',
												value: attributes.mediaID1,
												render: function( obj ) {
													return el( components.Button, {
															className: attributes.mediaID1 ? 'image-button' : 'button button-large',
															onClick: obj.open
														},
														i18n.__( 'Upload Image' )
													);
												}
											} 
										),
									),

									el( 'div', { className: 'absolutte-card-content' },

										el( RichText, {
												tagName: 'h4',
												className: 'absolutte-card-title absolutte-card-title1',
												placeholder: i18n.__( 'Title' ),
												keepPlaceholderOnFocus: true,
												value: attributes.title1,
												isSelected: false,
												onChange: function( newTitle ) {
													props.setAttributes( { title1: newTitle } );
												},
											} 
										),
										el( 'div', { className: 'absolutte-card-text absolutte-card-text1' },
											el( RichText, {
													tagName: 'p',
													placeholder: i18n.__( 'Sub title' ),
													keepPlaceholderOnFocus: true,
													value: attributes.content1,
													isSelected: false,
													onChange: function( newSubTitle ) {
														props.setAttributes( { content1: newSubTitle } );
													},
												} 
											),
										),
									),
									
								),
							),
							el( 'div', { className: 'col-12 col-lg-6' },
								el( 'div', { className: 'absolutte-card absolutte-track' },
									el( 'div', { className: 'absolutte-card-image' , style: { backgroundImage: `url('${ attributes.imageURL2 }')` } },
										el( MediaUpload, {
												onSelect: onSelectImage2,
												type: 'image',
												value: attributes.mediaID2,
												render: function( obj ) {
													return el( components.Button, {
															className: attributes.mediaID2 ? 'image-button' : 'button button-large',
															onClick: obj.open
														},
														i18n.__( 'Upload Image' )
													);
												}
											} 
										),
									),

									el( 'div', { className: 'absolutte-card-content' },

										el( RichText, {
												tagName: 'h4',
												className: 'absolutte-card-title absolutte-card-title2',
												placeholder: i18n.__( 'Title' ),
												keepPlaceholderOnFocus: true,
												value: attributes.title2,
												isSelected: false,
												onChange: function( newTitle ) {
													props.setAttributes( { title2: newTitle } );
												},
											} 
										),
										el( 'div', { className: 'absolutte-card-text absolutte-card-text2' },
											el( RichText, {
													tagName: 'p',
													placeholder: i18n.__( 'Sub title' ),
													keepPlaceholderOnFocus: true,
													value: attributes.content2,
													isSelected: false,
													onChange: function( newSubTitle ) {
														props.setAttributes( { content2: newSubTitle } );
													},
												} 
											),
										),
									),
									
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
				<div className={ props.className + ' absolutte-section-cards absolutte-section' } id={ attributes.idAttr } style={ {
					backgroundColor: attributes.sectionBackgroundColor
				} }>

					<div className="container">
						<div className="row">
							<div className="col-12 col-lg-6">
								<div className="absolutte-card absolutte-track" data-animation="fadeInUp">
									<div className="absolutte-card-image" style={ { backgroundImage: `url('${ attributes.imageURL1 }')` } }></div>
									<div class="absolutte-card-content">
										<h3 className="absolutte-card-title absolutte-card-title1">{ attributes.title1 }</h3>
										<div className="absolutte-card-text absolutte-card-text1">
											{ attributes.content1 }
										</div>
									</div>
								</div>
							</div>

							<div className="col-12 col-lg-6">
								<div className="absolutte-card absolutte-track" data-animation="fadeInUp">
									<div className="absolutte-card-image" style={ { backgroundImage: `url('${ attributes.imageURL2 }')` } }></div>
									<div class="absolutte-card-content">
										<h3 className="absolutte-card-title absolutte-card-title2">{ attributes.title2 }</h3>
										<div className="absolutte-card-text absolutte-card-text2">
											{ attributes.content2 }
										</div>
									</div>
								</div>
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