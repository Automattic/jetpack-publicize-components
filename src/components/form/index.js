/**
 * Publicize sharing form component.
 *
 * Displays text area and connection list to allow user
 * to select connections to share to and write a custom
 * sharing message.
 */

import { getRedirectUrl } from '@automattic/jetpack-components';
import { getSiteFragment } from '@automattic/jetpack-shared-extension-utils';
import { PanelRow, Disabled } from '@wordpress/components';
import { Fragment, createInterpolateElement } from '@wordpress/element';
import { _n, sprintf } from '@wordpress/i18n';
import useSocialMediaConnections from '../../hooks/use-social-media-connections';
import useSocialMediaMessage from '../../hooks/use-social-media-message';
import PublicizeConnection from '../connection';
import MessageBoxControl from '../message-box-control';
import Notice from '../notice';
import PublicizeSettingsButton from '../settings-button';
import styles from './styles.module.scss';

/**
 * The Publicize form component. It contains the connection list, and the message box.
 *
 * @param {object} props                                - The component props.
 * @param {boolean} props.isPublicizeEnabled            - Whether Publicize is enabled for this post.
 * @param {boolean} props.isPublicizeDisabledBySitePlan - A combination of the republicize feature being enabled and/or the post not being published.
 * @param {number} props.numberOfSharesRemaining        - The number of shares remaining for the current period. Optional.
 * @returns {object}                                    - Publicize form component.
 */
export default function PublicizeForm( {
	isPublicizeEnabled,
	isPublicizeDisabledBySitePlan,
	numberOfSharesRemaining = null,
} ) {
	const {
		connections,
		toggleById,
		hasConnections,
		enabledConnections,
	} = useSocialMediaConnections();
	const { message, updateMessage, maxLength } = useSocialMediaMessage();

	const Wrapper = isPublicizeDisabledBySitePlan ? Disabled : Fragment;

	const outOfConnections =
		numberOfSharesRemaining !== null && numberOfSharesRemaining <= enabledConnections.length;

	return (
		<Wrapper>
			{ hasConnections && (
				<>
					{ numberOfSharesRemaining !== null && (
						<PanelRow>
							<Notice type={ numberOfSharesRemaining < connections.length ? 'warning' : 'default' }>
								{ createInterpolateElement(
									sprintf(
										/* translators: %d is the number of shares remaining, upgradeLink is the link to upgrade to a different plan */
										_n(
											'You have %d share remaining. <upgradeLink>Upgrade</upgradeLink> to share to all your social media accounts.',
											'You have %d shares remaining. <upgradeLink>Upgrade</upgradeLink> to share to all your social media accounts.',
											numberOfSharesRemaining,
											'jetpack'
										),
										numberOfSharesRemaining
									),
									{
										upgradeLink: (
											<a
												href={ getRedirectUrl( 'jetpack-social-basic-plan-block-editor', {
													site: getSiteFragment(),
													query: 'redirect_to=' + window.location.href,
												} ) }
											/>
										),
									}
								) }
							</Notice>
						</PanelRow>
					) }
					<PanelRow>
						<ul className={ styles[ 'connections-list' ] }>
							{ connections.map(
								( { display_name, enabled, id, service_name, toggleable, profile_picture } ) => (
									<PublicizeConnection
										disabled={
											! isPublicizeEnabled || ( ! enabled && toggleable && outOfConnections )
										}
										enabled={ enabled && ! isPublicizeDisabledBySitePlan }
										key={ id }
										id={ id }
										label={ display_name }
										name={ service_name }
										toggleConnection={ toggleById }
										profilePicture={ profile_picture }
									/>
								)
							) }
						</ul>
					</PanelRow>
				</>
			) }

			{ ! isPublicizeDisabledBySitePlan && (
				<Fragment>
					<PublicizeSettingsButton />

					{ isPublicizeEnabled && connections.some( connection => connection.enabled ) && (
						<MessageBoxControl
							maxLength={ maxLength }
							onChange={ updateMessage }
							message={ message }
						/>
					) }
				</Fragment>
			) }
		</Wrapper>
	);
}
