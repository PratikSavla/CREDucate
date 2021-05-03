import JwtService from "@affinidi/common/dist/services/JwtService";
import { AffinityWallet as Wallet } from '@affinidi/wallet-browser-sdk'
import { __dangerous } from '@affinidi/wallet-core-sdk'

const { WalletStorageService } = __dangerous
const SDK_OPTIONS = {
  env: "prod",
  apiKey: "0375c393-1eed-45af-ad2b-98e61b51171b"
}

class SDKConfigurator {
  static getSdkOptions() {
    const { env, apiKey } = SDK_OPTIONS;
    // @ts-ignore
    const options = Wallet.setEnvironmentVarialbles({ env });

    return Object.assign({}, options, { apiKey, env });
  }
}

class SdkService {
  constructor(_networkMember) {
    this.jwtService = new JwtService();
    this._networkMember = _networkMember;
  };

  get accessToken() {
    return this._networkMember.accessToken;
  }

  get did() {
    return this._networkMember.did;
  }

  get encryptedSeed() {
    return this._networkMember.encryptedSeed;
  }

  get encryptionKey() {
    return this._networkMember.password;
  }

  get accessApiKey() {
    return (this._networkMember)._accessApiKey;
  }

  async createEncryptedMessage(did, payload) {
    return this._networkMember.createEncryptedMessage(did, payload);
  }

  async readEncryptedMessage(message) {
    return this._networkMember.readEncryptedMessage(message);
  }

  static async fromLoginAndPassword(
    username,
    password
  ) {
    const networkMember = await Wallet.fromLoginAndPassword(
      username,
      password,
      SDK_OPTIONS
    );
    return new SdkService(networkMember);
  }

  async signOut() {
    await this._networkMember.signOut();
  }

  async verifyCredentialShareResponseToken(
    credentialShareResponseToken,
  ) {
    return this._networkMember.verifyCredentialShareResponseToken(
      credentialShareResponseToken,
    );
  }

  static async fromAccessToken(accessToken) {
    const { keyStorageUrl } = SDKConfigurator.getSdkOptions();

    const encryptedSeed = await WalletStorageService.pullEncryptedSeed(
      accessToken,
      keyStorageUrl,
      SDK_OPTIONS
    );
    const encryptionKey = await WalletStorageService.pullEncryptionKey(
      accessToken
    );

    const networkMember = new Wallet(encryptionKey, encryptedSeed, {
      ...SDK_OPTIONS,
      cognitoUserTokens: { accessToken },
    });
    return new SdkService(networkMember);
  }
  async createCredentialShareResponseToken(credentialShareRequestToken, suppliedCredentials) {
    return this._networkMember.createCredentialShareResponseToken(credentialShareRequestToken, suppliedCredentials)
  }
  async createCredentialShareRequestToken() {
    var today = new Date()
    const date = new Date(today.setFullYear(today.getFullYear() + 1));
    const credentialRequirements = [{ type: ['Credential', 'EducationCredentialPersonV1'] }]
    return this._networkMember.generateCredentialShareRequestToken(credentialRequirements, null ,{'expiresAt':date.toISOString()})
  }
  parseToken(token) {
    return JwtService.fromJWT(token)
  }
}

export default SdkService;
