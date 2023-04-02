import { IamOpenidConnectProvider } from '@cdktf/provider-aws/lib/iam-openid-connect-provider';
import { IamRole } from '@cdktf/provider-aws/lib/iam-role';
import { Construct } from 'constructs';

interface Props {
  thumbprint: string;
  organization: string;
}

export default class GitHubActionsRole extends Construct {
  constructor (scope: Construct, id: string, props: Props) {
    super(scope, id);

    const { thumbprint, organization } = props;

    const iamOpenidConnectProvider = new IamOpenidConnectProvider(this, 'openid_connect_provider', {
      url: 'https://token.actions.githubusercontent.com',
      clientIdList: ['sts.amazonaws.com'],
      thumbprintList: [thumbprint],
    });

    new IamRole(this, 'github_action_role', {
      name: 'github_actions_role',
      managedPolicyArns: [
        'arn:aws:iam::aws:policy/AdministratorAccess',
      ],
      assumeRolePolicy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              Federated: iamOpenidConnectProvider.arn,
            },
            Action: 'sts:AssumeRoleWithWebIdentity',
            Condition: {
              StringLike: {
                'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
                'token.actions.githubusercontent.com:sub': `repo:${organization}/*`,
              },
            },
          },
        ],
      }),
    });
  }
}
