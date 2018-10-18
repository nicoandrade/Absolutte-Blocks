/**
 * BLOCK: gallery
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

 /*
Gallery Function
=========================================================
*/



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
		el('path', { d: "M 22 3 L 18.300781 4.101563 C 14.199219 5.300781 9.800781 5.300781 5.699219 4.101563 L 2 3 L 2 19 L 5.699219 17.898438 C 9.800781 16.699219 14.199219 16.699219 18.300781 17.898438 L 22 19 Z M 15.800781 14.199219 C 13.300781 13.601563 10.601563 13.601563 8.101563 14.199219 L 5 15 L 9 9.398438 L 11 11.898438 L 14 8 L 19 15 Z" } )
	);

	registerBlockType( 'absolutte-blocks/gallery', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		title: i18n.__( 'AB - Gallery Section' ), // The title of our block.
		description: i18n.__( 'Displays a gallery.' ), // The description of our block.
		icon: icon, // Dashicon icon for our block. Custom icons can be added using inline SVGs.
		category: 'common', // The category of the block.
		attributes: { // Necessary for saving block content.
			title: {
				type: 'array',
				source: 'children',
				selector: 'h3',
			},
			mediasID: {
				type: 'array',
			},
			imagesURL: {
				type: 'array',
			},
			images: {
				type: 'array',
			},
			idAttr: {
				type: 'string',
			},
		},


		edit: function( props ) {

			var attributes = props.attributes;

			function onlyUnique(value, index, self) { 
				return self.indexOf(value) === index;
			};

			var onSelectImage = function( media ) {
				var alreadyImages = [];
				var alreadyImagesArr = [];
				var alreadyIds = [];
				
				media.forEach(function(media_info) {
					alreadyImages.push( media_info.url );
					alreadyIds.push( media_info.id );

					var image = {
						id: media_info.id,
						url: media_info.url,
						width: media_info.width,
						height: media_info.height,
						sizes: media_info.sizes,
					}
					alreadyImagesArr.push( image );
				});

				alreadyImages = alreadyImages.filter( onlyUnique );
				alreadyIds = alreadyIds.filter( onlyUnique );
				alreadyImagesArr = alreadyImagesArr.filter( onlyUnique );
				
				return props.setAttributes( {
					imagesURL: alreadyImages,
					mediasID: alreadyIds,
					images: alreadyImagesArr,
				} );
			};

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
				el( 'div', { className: props.className + ' absolutte-section-gallery absolutte-section', id: attributes.idAttr },
					el( 'div', { className: 'container' },
						el( 'div', { className: 'row' },
							el( 'div', { className: 'col-md-12' },
								el( RichText, {
										tagName: 'h3',
										className: 'absolutte-testimonials-title absolutte-section-title-small',
										placeholder: i18n.__( 'Title' ),
										keepPlaceholderOnFocus: true,
										value: attributes.title,
										isSelected: false,
										onChange: function( newTitle ) {
											props.setAttributes( { title: newTitle } );
										},
									} 
								),
							),
						),
					),
					el( 'div', { className: 'absolutte-gallery-image-upload' },
						el( MediaUpload, {
								onSelect: onSelectImage,
								type: 'image',
								value: attributes.mediasID,
								multiple: true,
								render: function( obj ) {
									return el( components.Button, {
											className: 'button button-large',
											onClick: obj.open
										},
										i18n.__( 'Upload Images' )
									);
								}
							} 
						),
					),
					el( 'div', { className: 'absolutte-gallery' },
						! attributes.imagesURL ? 
						null 
						: 
						(
							
							attributes.imagesURL.map( 
								image => (
									el( 'div', { className: 'absolutte-gallery-item' },
										el( 'img', { src: image },
										),
									)
								)
							)
						),
					),
				),
				
			];
		},

		save: function( props ) {
			var attributes = props.attributes;

			return (
				el( 'div', { className: props.className + ' absolutte-section-gallery absolutte-section', id: attributes.idAttr },
					el( 'div', { className: 'container' },
						el( 'div', { className: 'row' },
							el( 'div', { className: 'col-md-12' },
								el( 'h3', { className: 'absolutte-testimonials-title absolutte-section-title-small' },
									attributes.title
								),
							),
						),
					),
					el( 'div', { className: 'absolutte-gallery' },
						! attributes.images ? 
						null 
						: 
						(
							attributes.images.map( 
								image => (
									<div class="absolutte-gallery-item" data-animation="fadeInUp">
										<a href={ image.url } data-width={ image.width } data-height={ image.height }>
											<img src={ image.url } />
										</a>
									</div>
								)
							)
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