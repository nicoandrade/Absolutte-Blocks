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
		el('path', { d: "M 3 3 C 1.895 3 1 3.895 1 5 L 1 17 C 1 18.105 1.895 19 3 19 L 8 19 L 8 21 L 16 21 L 16 19 L 21 19 C 22.105 19 23 18.105 23 17 L 23 5 C 23 3.895 22.105 3 21 3 L 3 3 z M 3 5 L 21 5 L 21 17 L 3 17 L 3 5 z M 10 7 L 10 15 L 15 11 L 10 7 z" } )
	);

	registerBlockType( 'absolutte-blocks/video', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		title: i18n.__( 'AB - Video Section' ), // The title of our block.
		description: i18n.__( 'Displays a video banner.' ), // The description of our block.
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
			mediaID: {
				type: 'number',
			},
			imageURL: {
				type: 'string',
			},
			mediaIconID: {
				type: 'number',
			},
			iconURL: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			},
			videoURL: {
				type: 'string',
			},
			iconBackgroundColor: {
				type: 'string',
				default: '#d9f3bd'
			},
			titleColor: {
				type: 'string',
				default: '#3acb7c'
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
			var onSelectIconImage = function( media ) {
				return props.setAttributes( {
					iconURL: media.url,
					mediaIconID: media.id,
				} );
			};

			var onBackgroundColorChange = function( changes ) {
				return props.setAttributes( {
					iconBackgroundColor: changes
				} );
			};
			var onBackgroundColorChange2 = function( changes ) {
				return props.setAttributes( {
					titleColor: changes
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
							label: i18n.__( 'Video URL (YouTube or Vimeo)' ),
							value: attributes.videoURL,
							onChange: function( newVideoURL ) {
								props.setAttributes( { videoURL: newVideoURL } );
							},
						} ),
						el( 'p', {}, i18n.__( 'Icon Background Color.' ) ),
						el( ColorPalette, {
							onChange: onBackgroundColorChange,
							value: attributes.iconBackgroundColor,
						} ),
						el( 'p', {}, i18n.__( 'Title Color.' ) ),
						el( ColorPalette, {
							onChange: onBackgroundColorChange2,
							value: attributes.titleColor,
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

				el( 'div', { className: props.className + ' absolutte-section-video absolutte-section', id: attributes.idAttr },
					el( 'div', { className: 'absolutte-video-text' },
						el( 'div', { className: 'absolutte-service-icon-wrap absolutte-track', style: { backgroundColor: attributes.iconBackgroundColor } }, 
							el( MediaUpload, {
									onSelect: onSelectIconImage,
									type: 'image',
									value: attributes.mediaIconID,
									className: 'absolutte-service-icon',
									render: function( obj ) {
										return el( components.Button, {
												className: attributes.mediaIconID ? 'image-button' : 'button button-large',
												onClick: obj.open
											},
											! attributes.mediaID ? i18n.__( 'Upload Image' ) : el( 'img', { src: attributes.iconURL, className: 'absolutte-service-icon' } )
										);
									}
								} 
							),
						),
						el( RichText, {
								tagName: 'h3',
								className: 'absolutte-video-title absolutte-track',
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
						el( RichText, {
								tagName: 'p',
								className: 'absolutte-video-desc absolutte-track',
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
					el( 'div', { className: 'absolutte-video-popup embed-responsive embed-responsive-16by9 absolutte-track' },
						el( 'a', { className: 'absolutte-video-popup-link', style: { backgroundImage: `url('${ attributes.imageURL }')` } },
							el( MediaUpload, {
									onSelect: onSelectImage,
									type: 'image',
									value: attributes.mediaID,
									render: function( obj ) {
										return el( components.Button, {
												className: attributes.mediaID ? 'image-button' : 'button button-large',
												onClick: obj.open
											},
											! attributes.mediaID ? i18n.__( 'Upload Image' ) : null
										);
									}
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
					className: props.className + ' absolutte-section-video absolutte-section',
					id: attributes.idAttr
				},
					(
						<div>
							<div className="absolutte-video-text">
								<div className="absolutte-service-icon-wrap absolutte-track" data-animation="bounceIn">
									<img src={ attributes.iconURL } className="absolutte-service-icon" />
								</div>
								<h3 className="absolutte-video-title absolutte-track" data-animation="absoluteFadeInUp">{ attributes.title }</h3>
								<p className="absolutte-video-desc absolutte-track" data-animation="absoluteFadeInUp">{ attributes.subtitle }</p>    
							</div>
							<div className="absolutte-video-popup embed-responsive embed-responsive-16by9 absolutte-track" data-animation="bounceIn">
								<a href={ attributes.videoURL } className="absolutte-video-popup-link" data-video={ attributes.videoURL } style={ { backgroundImage: `url('${ attributes.imageURL }')` } }></a>
							</div>
							<div className="absolutte-diagonal-top"><svg viewBox="0 0 1440 50"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g  fill="#FFFFFF" fill-rule="nonzero"><polygon points="1440 50 1440 0 0 0"></polygon></g></g></svg></div>
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