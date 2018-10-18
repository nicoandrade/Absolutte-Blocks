/**
 * BLOCK: clients
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

	const icon = el('svg', { width: 20, height: 20, viewBox: '0 0 24 24' },
		el('path', { d: "M 3 3 L 3 7 L 5 7 L 5 5 L 7 5 L 7 3 L 3 3 z M 17 3 L 17 5 L 19 5 L 19 7 L 21 7 L 21 3 L 17 3 z M 12 5 C 10.346 5 9 6.346 9 8 C 9 9.654 10.346 11 12 11 C 13.654 11 15 9.654 15 8 C 15 6.346 13.654 5 12 5 z M 12 12 C 10.331 12 7 12.837 7 14.5 L 7 17 L 17 17 L 17 14.5 C 17 12.837 13.669 12 12 12 z M 3 17 L 3 21 L 7 21 L 7 19 L 5 19 L 5 17 L 3 17 z M 19 17 L 19 19 L 17 19 L 17 21 L 21 21 L 21 17 L 19 17 z" } )
	);

	registerBlockType( 'absolutte-blocks/clients', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		title: i18n.__( 'AB - Clients Section' ), // The title of our block.
		description: i18n.__( 'Displays logos from clients.' ), // The description of our block.
		icon: icon, // Dashicon icon for our block. Custom icons can be added using inline SVGs.
		category: 'common', // The category of the block.
		attributes: { // Necessary for saving block content.
			title: {
				type: 'array',
				source: 'children',
				selector: 'h3',
			},
			mediaID1: { type: 'number',},
			imageURL1: {type: 'string', },
			linkURL1: {type: 'url', },
			mediaID2: {type: 'number', },
			imageURL2: {type: 'string', },
			linkURL2: {type: 'url', },
			mediaID3: {type: 'number', },
			imageURL3: {type: 'string', },
			linkURL3: {type: 'url', },
			mediaID4: {type: 'number', },
			imageURL4: {type: 'string', },
			linkURL4: {type: 'url', },
			mediaID5: {type: 'number', },
			imageURL5: {type: 'string', },
			linkURL5: {type: 'url', },
			mediaID6: {type: 'number', },
			imageURL6: {type: 'string', },
			linkURL6: {type: 'url', },
			mediaID7: {type: 'number', },
			imageURL7: {type: 'string', },
			linkURL7: {type: 'url', },
			mediaID8: {type: 'number', },
			imageURL8: {type: 'string', },
			linkURL8: {type: 'url', },
			idAttr: {
				type: 'string',
			},
		},

		edit: function( props ) {

			var attributes = props.attributes;

			var onSelectImage1 = function( media ) {return props.setAttributes( { imageURL1: media.url, mediaID1: media.id, } ); };
			var onSelectImage2 = function( media ) {return props.setAttributes( { imageURL2: media.url, mediaID2: media.id, } ); };
			var onSelectImage3 = function( media ) {return props.setAttributes( { imageURL3: media.url, mediaID3: media.id, } ); };
			var onSelectImage4 = function( media ) {return props.setAttributes( { imageURL4: media.url, mediaID4: media.id, } ); };
			var onSelectImage5 = function( media ) {return props.setAttributes( { imageURL5: media.url, mediaID5: media.id, } ); };
			var onSelectImage6 = function( media ) {return props.setAttributes( { imageURL6: media.url, mediaID6: media.id, } ); };
			var onSelectImage7 = function( media ) {return props.setAttributes( { imageURL7: media.url, mediaID7: media.id, } ); };
			var onSelectImage8 = function( media ) {return props.setAttributes( { imageURL8: media.url, mediaID8: media.id, } ); };

			return [
				el( InspectorControls, { key: 'inspector' }, // Display the block options in the inspector panel.
					el( components.PanelBody, {
						title: i18n.__( 'Attributes' ),
						className: 'block-attributes',
						initialOpen: true,
					},
						el( 'p', {}, i18n.__( 'Links for the logo.' ) ),
						el( TextControl, {
							type: 'url',
							label: i18n.__( 'Link URL #1' ),
							placeholder: 'https://',
							value: attributes.linkURL1,
							onChange: function( newLinkURL ) {
								props.setAttributes( { linkURL1: newLinkURL } );
							},
						} ),
						el( TextControl, {
							type: 'url',
							label: i18n.__( 'Link URL #2' ),
							placeholder: 'https://',
							value: attributes.linkURL2,
							onChange: function( newLinkURL ) {
								props.setAttributes( { linkURL2: newLinkURL } );
							},
						} ),
						el( TextControl, {
							type: 'url',
							label: i18n.__( 'Link URL #3' ),
							placeholder: 'https://',
							value: attributes.linkURL3,
							onChange: function( newLinkURL ) {
								props.setAttributes( { linkURL3: newLinkURL } );
							},
						} ),
						el( TextControl, {
							type: 'url',
							label: i18n.__( 'Link URL #4' ),
							placeholder: 'https://',
							value: attributes.linkURL4,
							onChange: function( newLinkURL ) {
								props.setAttributes( { linkURL4: newLinkURL } );
							},
						} ),
						el( TextControl, {
							type: 'url',
							label: i18n.__( 'Link URL #5' ),
							placeholder: 'https://',
							value: attributes.linkURL5,
							onChange: function( newLinkURL ) {
								props.setAttributes( { linkURL5: newLinkURL } );
							},
						} ),
						el( TextControl, {
							type: 'url',
							label: i18n.__( 'Link URL #6' ),
							placeholder: 'https://',
							value: attributes.linkURL6,
							onChange: function( newLinkURL ) {
								props.setAttributes( { linkURL6: newLinkURL } );
							},
						} ),
						el( TextControl, {
							type: 'url',
							label: i18n.__( 'Link URL #7' ),
							placeholder: 'https://',
							value: attributes.linkURL7,
							onChange: function( newLinkURL ) {
								props.setAttributes( { linkURL7: newLinkURL } );
							},
						} ),
						el( TextControl, {
							type: 'url',
							label: i18n.__( 'Link URL #8' ),
							placeholder: 'https://',
							value: attributes.linkURL8,
							onChange: function( newLinkURL ) {
								props.setAttributes( { linkURL8: newLinkURL } );
							},
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
				el( 'div', { className: props.className + ' absolutte-section-clients absolutte-section', id: attributes.idAttr },
					el( RichText, {
							tagName: 'h3',
							className: 'absolutte-clients-title',
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

					el( 'div', { className: 'absolutte-clients' },
						el( 'a', { className: 'absolutte-client' }, 
							el( MediaUpload, {
									onSelect: onSelectImage1,
									type: 'image',
									value: attributes.mediaID1,
									render: function( obj ) {
										return el( components.Button, {
												className: attributes.mediaID1 ? 'image-button' : 'button button-large',
												onClick: obj.open
											},
											! attributes.mediaID1 ? i18n.__( 'Upload Image' ) : el( 'img', { src: attributes.imageURL1, className: 'absolutte-service-icon' } )
										);
									}
								} 
							),
						),
						el( 'a', { className: 'absolutte-client' }, 
							el( MediaUpload, {
									onSelect: onSelectImage2,
									type: 'image',
									value: attributes.mediaID2,
									render: function( obj ) {
										return el( components.Button, {
												className: attributes.mediaID2 ? 'image-button' : 'button button-large',
												onClick: obj.open
											},
											! attributes.mediaID2 ? i18n.__( 'Upload Image' ) : el( 'img', { src: attributes.imageURL2, className: 'absolutte-service-icon' } )
										);
									}
								} 
							),
						),
						el( 'a', { className: 'absolutte-client' }, 
							el( MediaUpload, {
									onSelect: onSelectImage3,
									type: 'image',
									value: attributes.mediaID3,
									render: function( obj ) {
										return el( components.Button, {
												className: attributes.mediaID3 ? 'image-button' : 'button button-large',
												onClick: obj.open
											},
											! attributes.mediaID3 ? i18n.__( 'Upload Image' ) : el( 'img', { src: attributes.imageURL3, className: 'absolutte-service-icon' } )
										);
									}
								} 
							),
						),
						el( 'a', { className: 'absolutte-client' }, 
							el( MediaUpload, {
									onSelect: onSelectImage4,
									type: 'image',
									value: attributes.mediaID4,
									render: function( obj ) {
										return el( components.Button, {
												className: attributes.mediaID4 ? 'image-button' : 'button button-large',
												onClick: obj.open
											},
											! attributes.mediaID4 ? i18n.__( 'Upload Image' ) : el( 'img', { src: attributes.imageURL4, className: 'absolutte-service-icon' } )
										);
									}
								} 
							),
						),
						el( 'a', { className: 'absolutte-client' }, 
							el( MediaUpload, {
									onSelect: onSelectImage5,
									type: 'image',
									value: attributes.mediaID5,
									render: function( obj ) {
										return el( components.Button, {
												className: attributes.mediaID5 ? 'image-button' : 'button button-large',
												onClick: obj.open
											},
											! attributes.mediaID5 ? i18n.__( 'Upload Image' ) : el( 'img', { src: attributes.imageURL5, className: 'absolutte-service-icon' } )
										);
									}
								} 
							),
						),
						el( 'a', { className: 'absolutte-client' }, 
							el( MediaUpload, {
									onSelect: onSelectImage6,
									type: 'image',
									value: attributes.mediaID6,
									render: function( obj ) {
										return el( components.Button, {
												className: attributes.mediaID6 ? 'image-button' : 'button button-large',
												onClick: obj.open
											},
											! attributes.mediaID6 ? i18n.__( 'Upload Image' ) : el( 'img', { src: attributes.imageURL6, className: 'absolutte-service-icon' } )
										);
									}
								} 
							),
						),
						el( 'a', { className: 'absolutte-client' }, 
							el( MediaUpload, {
									onSelect: onSelectImage7,
									type: 'image',
									value: attributes.mediaID7,
									render: function( obj ) {
										return el( components.Button, {
												className: attributes.mediaID7 ? 'image-button' : 'button button-large',
												onClick: obj.open
											},
											! attributes.mediaID7 ? i18n.__( 'Upload Image' ) : el( 'img', { src: attributes.imageURL7, className: 'absolutte-service-icon' } )
										);
									}
								} 
							),
						),
						el( 'a', { className: 'absolutte-client' }, 
							el( MediaUpload, {
									onSelect: onSelectImage8,
									type: 'image',
									value: attributes.mediaID8,
									render: function( obj ) {
										return el( components.Button, {
												className: attributes.mediaID8 ? 'image-button' : 'button button-large',
												onClick: obj.open
											},
											! attributes.mediaID8 ? i18n.__( 'Upload Image' ) : el( 'img', { src: attributes.imageURL8, className: 'absolutte-service-icon' } )
										);
									}
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
				el( 'div', { className: props.className + ' absolutte-section-clients absolutte-section', id: attributes.idAttr },
					el( 'h3', { className: 'absolutte-clients-title' }, attributes.title ),

					el( 'div', { className: 'absolutte-clients'},
						! attributes.mediaID1 ? 
						null : 
						el( 'a', { href: attributes.linkURL1, className: 'absolutte-client' },
							el( 'img', { src: attributes.imageURL1 } )
						),
						! attributes.mediaID2 ? 
						null : 
						el( 'a', { href: attributes.linkURL2, className: 'absolutte-client' },
							el( 'img', { src: attributes.imageURL2 } )
						),
						! attributes.mediaID3 ? 
						null : 
						el( 'a', { href: attributes.linkURL3, className: 'absolutte-client' },
							el( 'img', { src: attributes.imageURL3 } )
						),
						! attributes.mediaID4 ? 
						null : 
						el( 'a', { href: attributes.linkURL4, className: 'absolutte-client' },
							el( 'img', { src: attributes.imageURL4 } )
						),
						! attributes.mediaID5 ? 
						null : 
						el( 'a', { href: attributes.linkURL5, className: 'absolutte-client' },
							el( 'img', { src: attributes.imageURL5 } )
						),
						! attributes.mediaID6 ? 
						null : 
						el( 'a', { href: attributes.linkURL6, className: 'absolutte-client' },
							el( 'img', { src: attributes.imageURL6 } )
						),
						! attributes.mediaID7 ? 
						null : 
						el( 'a', { href: attributes.linkURL7, className: 'absolutte-client' },
							el( 'img', { src: attributes.imageURL7 } )
						),
						! attributes.mediaID8 ? 
						null : 
						el( 'a', { href: attributes.linkURL8, className: 'absolutte-client' },
							el( 'img', { src: attributes.imageURL8 } )
						),
					)
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