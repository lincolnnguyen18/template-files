import GitHubActionsRole from '../components/GitHubActionsRole';
import { Construct } from 'constructs';
import { Server } from '../../.gen/providers/hcloud/server';

export default class SharedInfraBackend extends Construct {
  constructor (scope: Construct, id: string) {
    super(scope, id);

    new GitHubActionsRole(this, 'github_actions_role', {
      organization: 'lincolnnguyen18',
      thumbprint: '6938fd4d98bab03faadb97b34396831e3780aea1',
    });

    new Server(this, 'server', {
      name: 'server-jo1',
      image: 'ubuntu-22.04',
      serverType: 'cx11',
      sshKeys: ['default-rsa'],
    });
  }
}
