import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ActionLog from './actionlog/ActionLog.jsx';
import Announcements from './announcements/Announcements.jsx';
import Associates from './associates/Associates.jsx';
import Automod from './automod/Automod.jsx';
import Automessage from './automessage/Automessage.jsx';
import Autopurge from './autopurge/Autopurge.jsx';
import Autoresponder from './autoresponder/AutoResponder.jsx';
import Autoroles from './autoroles/Autoroles.jsx';
import Cleverbot from './cleverbot/Cleverbot.jsx';
import Commands from './commands/Commands.jsx';
import CustomCommands from './customcommands/CustomCommands.jsx';
import MessageEmbedder from './messageEmbedder/MessageEmbedder.jsx';
import Moderation from './moderation/Moderation.jsx';
import ModuleCommands from './commands/ModuleCommands.jsx';
import Modules from './modules/Modules.jsx';
import Music from './music/Music.jsx';
import Nav from './sidebar/Nav.jsx';
import Settings from './settings/Settings.jsx';
import Tags from './tags/Tags.jsx';
import VoiceTextLinking from './vtl/VoiceTextLinking.jsx';
import Queue from './music/Queue.jsx';
import Slowmode from './slowmode/Slowmode.jsx';
import Welcome from './welcome/Welcome.jsx';
import ReactionRoles from './reactionroles/ReactionRoles.jsx';
import Logs from './logs/Logs.jsx';
import ServerListing from './serverlisting/ServerListing.jsx';
// import CommandLogs from './commandlogs/CommandLogs.jsx';
// import DashboardLogs from './dashboardlogs/DashboardLogs.jsx';
// import ModLogs from './modlogs/ModLogs.jsx';
import Warnings from './warnings/Warnings.jsx';
import ErrorHandler from './common/ErrorHandler.jsx';
import Footer from './footer/Footer.jsx';
import { updateModuleState } from './service/dashboardService.js';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isPremium: config.isPremium,
			modules: config.modules,
			server: config.server,
		};
	}

	async toggleModule(module, checked) {
		updateModuleState(module, checked);
		const modules = this.state.modules;
		const index = modules.findIndex(m => m._id === module._id);
		if (index !== -1) {
			modules[index] = module;
			this.setState({ modules: modules });
		}
	}

	getProps(moduleName) {
		const props = {
			isPremium: this.state.isPremium,
			modules: this.state.modules,
			match: this.props.match,
			guildId: this.props.match.params.id,
			toggleModule: this.toggleModule.bind(this),
			server: this.state.server,
		};
		if (moduleName) {
			props.module = this.getModule(moduleName);
		}
		return props;
	}

	getModule(name) {
		return this.state.modules.find(m => m.name.toLowerCase() === name.toLowerCase());
	}

	render() {
		const path = this.props.match.path;

		return (<div className="columns">
			<Nav {...this.getProps()} />
			<ErrorHandler>
				<div className="column">
					<Switch>
						{/* <Route exact path={path} component={Settings} /> */}
						<Route exact path={path} render={(props) => (
							<Settings {...props} data={this.getProps()} />
						)} />
						<Route path={`${path}/server-listing`} render={(props) => (
							<ServerListing {...props} data={this.getProps('ServerListing')} />
						)} />
						<Route path={`${path}/commands`} render={(props) => (
							<Commands {...props} data={this.getProps()} />
						)} />
						<Route exact path={`${path}/modules`} render={(props) => (
							<Modules {...props} data={this.getProps()} />
						)} />
						<Route exact path='/manage/:id/modules/:module/commands' render={(props) => {
							const module = this.getProps().modules.find(m => m.partialId === props.match.params.module);
							return (
								<ModuleCommands {...props} module={module} data={this.getProps()} />
							);
						} } />
						<Route path={`${path}/modules/announcements`} render={(props) => (
							<Announcements {...props} data={this.getProps('Announcements')} />
						)} />
						<Route path={`${path}/modules/actionlog`} render={(props) => (
							<ActionLog {...props} data={this.getProps('ActionLog')} />
						)} />
						<Route path={`${path}/modules/moderation`} render={(props) => (
							<Moderation {...props} data={this.getProps('Moderation')} />
						)} />
						<Route path={`${path}/modules/automod`} render={(props) => (
							<Automod {...props} data={this.getProps('Automod')} />
						)} />
						<Route path={`${path}/modules/automessage`} render={(props) => (
							<Automessage {...props} data={this.getProps('Automessage')} />
						)} />
						<Route path={`${path}/modules/autopurge`} render={(props) => (
							<Autopurge {...props} data={this.getProps('Autopurge')} />
						)} />
						<Route path={`${path}/modules/autoresponder`} render={(props) => (
							<Autoresponder {...props} data={this.getProps('Autoresponder')} />
						)} />
						<Route path={`${path}/modules/autoroles`} render={(props) => (
							<Autoroles {...props} data={this.getProps('Autoroles')} />
						)} />
						<Route path={`${path}/modules/cleverbot`} render={(props) => (
							<Cleverbot {...props} data={this.getProps('Cleverbot')} />
						)} />
						<Route path={`${path}/modules/music`} render={(props) => (
							<Music {...props} data={this.getProps('Music')} />
						)} />
						{/* <Route path={`${path}/music-queue`} render={(props) => (
							<div className='module-content'>
								<Queue {...props} data={this.getProps()} />
							</div>
						)} /> */}
						<Route path={`${path}/modules/tags`} render={(props) => (
							<Tags {...props} data={this.getProps('Tags')} />
						)} />
						<Route path={`${path}/modules/voicetextlinking`} render={(props) => (
							<VoiceTextLinking {...props} data={this.getProps('VoiceTextLinking')} />
						)} />
						<Route path={`${path}/modules/customcommands`} render={(props) => (
							<CustomCommands {...props} data={this.getProps('CustomCommands')} />
						)} />
						<Route path={`${path}/modules/messageembedder`} render={(props) => (
							<MessageEmbedder {...props} data={this.getProps('MessageEmbedder')} />
						)} />
						<Route path={`${path}/modules/slowmode`} render={(props) => (
							<Slowmode {...props} data={this.getProps('Slowmode')} />
						)} />
						<Route path={`${path}/modules/welcome`} render={(props) => (
							<Welcome {...props} data={this.getProps('Welcome')} />
						)} />
						<Route path={`${path}/rmodules/eactionroles`} render={(props) => (
							<ReactionRoles {...props} data={this.getProps('ReactionRoles')} />
						)} />
						<Route path={`${path}/modules/associates`} render={(props) => (
							<Associates {...props} data={this.getProps('Associates')} />
						)} />
						<Route path={`${path}/logs`} component={Logs} />
						{/* <Route path={`${path}/weblogs`} component={DashboardLogs} />
					<Route path={`${path}/modlogs`} component={ModLogs} />
					<Route path={`${path}/commandlogs`} component={CommandLogs} /> */}
						<Route path={`${path}/warnings`} component={Warnings} />
					</Switch>
				</div>
				{/* <div className='column dash-footer'>
					<Footer {...this.getProps()} />
				</div> */}
			</ErrorHandler>
		</div>);
	}
}
