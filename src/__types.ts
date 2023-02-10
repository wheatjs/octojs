export interface Needs {
  /**
   * List of role needs
   */
  role?: string[]
  /**
   * List of group needs
   */
  group?: string[]
}

export interface Permissions {
  /**
   * The permission’s identifier
   */
  key: string
  /**
   * The permission’s name
   */
  name: string
  /**
   * Whether the permission should be considered dangerous due to a high responsibility (true) or not (false).
   */
  dangerous: boolean
  /**
   * List of group identifiers for which this permission is enabled by default
   */
  default_groups: string[]
  /**
   * Human readable description of the permission
   */
  description: string
  /**
   * Needs assigned to the permission
   */
  needs: Needs
}

export interface UserRecord {
  /**
   * The user's name
   */
  name: string
  /**
   * Whether the user's account is active (true) or not (false)
   */
  active: boolean
  /**
   * @deprecated Whether the user has user rights. Should always be true. Deprecated as of 1.4.0, use the users group instead.
   */
  user: boolean
  /**
   * @deprecated Whether the user has admin rights (true) or not (false). Deprecated as of 1.4.0, use the admins group instead.
   */
  admin: boolean
  /**
   * The user's personal API key
   */
  apikey?: string
  /**
   * The user's personal settings, might be an empty object.
   */
  settings: object
  /**
   * Groups assigned to the user
   */
  groups: string[]
  /**
   * Effective needs of the user
   */
  needs: Needs
  /**
   * The list of permissions assigned to the user (note: this does not include implicit permissions inherit from groups)
   */
  permissions?: Permissions[]
}

/**
 * Response of the POST /api/login API call
 */
export interface LoginPostResponse extends UserRecord {
  /**
   * The session key, can be used to authenticate with the auth message on the push API.
   */
  session: string
  /**
   * Whether the client that made the request got detected as external from the local network or not.
   */
  _is_external_client: boolean
}

/**
 * Response of the GET /api/currentuser API call
 */
export interface CurrentUserGetResponse {
  /**
   * The id of the current user. Unset if guest.
   */
  name?: string
  /**
   * The effective list of permissions assigned to the user
   */
  permissions?: Permissions[]
  /**
   * The list of groups assigned to the user
   */
  groups?: string[]
}

/**
 * Response of the GET /api/version API call
 */
export interface VersionGetResponse {
  /**
   * Version of the API
   */
  api: string

  /**
   * Version of the server
   */
  server: string

  /**
   * Human-readable version text
   */
  text: string
}

/**
 * Response of the GET /api/server API call
 */
export interface ServerGetResponse {
  /**
   * Server version
   */
  version: string

  /**
   * Indicates the reason the server is running in safe mode, or `false` if it's not running in safe mode.
   */
  safemode: 'settings' | 'incomplete_startup' | 'flag' | false
}

/**
 * Description of a printer profile
 */
export interface PrinterProfile {
  /**
   * Profile name
   */
  name: string

  /**
   * Profile ID
   */
  id: string
}

/**
 * Description of the current connection state
 */
export interface CurrentConnection {
  /**
   * Connection state. One of "Operational" or other values indicating the connection status.
   */
  state: string

  /**
   * Serial port in use
   */
  port: string

  /**
   * Baudrate in use
   */
  baudrate: number

  /**
   * Printer profile in use
   */
  printerProfile: string
}

/**
 * Description of the available options for the connection
 */
export interface ConnectionOptions {
  /**
   * List of available serial ports
   */
  ports: string[]

  /**
   * List of available baudrates
   */
  baudrates: number[]

  /**
   * List of available printer profiles
   */
  printerProfiles: PrinterProfile[]

  /**
   * Preferred serial port
   */
  portPreference: string

  /**
   * Preferred baudrate
   */
  baudratePreference: number

  /**
   * Preferred printer profile
   */
  printerProfilePreference: string

  /**
   * Whether to auto-connect to the printer on startup
   */
  autoconnect: boolean
}

/**
 * Response of the GET /api/connection API call
 */
export interface ConnectionGetResponse {
  /**
   * Description of the current connection state
   */
  current: CurrentConnection

  /**
   * Description of the available options for the connection
   */
  options: ConnectionOptions
}

export interface ConnectCommandRequest {

  /**
   * Command to execute. Must be "connect".
   */
  command: 'connect'

  /**
   * Optional, specific port to connect to. If not set the current portPreference will be used,
   * or if no preference is available auto detection will be attempted.
   */
  port?: string

  /**
   * Optional, specific baudrate to connect with. If not set the current baudratePreference will
   * be used, or if no preference is available auto detection will be attempted.
   */
  baudrate?: number

  /**
   * Optional, specific printer profile to use for connection. If not set the current default
   * printer profile will be used.
   */
  printerProfile?: string

  /**
   * Optional, whether to save the request’s port and baudrate settings as new preferences.
   * Defaults to false if not set.
   */
  save?: boolean

  /**
   * Optional, whether to automatically connect to the printer on OctoPrint’s startup in the future.
   * If not set no changes will be made to the current configuration.
   */
  autoconnect?: boolean
}

export interface DisconnectCommandRequest {

  /**
   * Command to execute. Must be "disconnect".
   */
  command: 'disconnect'

}

export interface FaceAckCommandRequest {

  /**
   * Fakes an acknowledgment message for OctoPrint in case one got lost on the serial line and the
   * communication with the printer since stalled. This should only be used in “emergencies” (e.g. to save prints),
   * the reason for the lost acknowledgment should always be properly investigated and removed instead of depending
   * on this “symptom solver”.
   */
  command: 'face_ack'

}

/**
 * Response of the POST /api/connection API call
 */
export interface ConnectionPostResponse {

}

/**
 * Representation of file and folder information
 */
export interface File {
  /**
   * The name of the file or folder
   */
  name: string
  /**
   * The path of the file or folder
   */
  path: string
  /**
   * The type of the file or folder (machinecode or folder)
   */
  type: 'machinecode' | 'folder'
  /**
   * The type path of the file or folder
   */
  typePath: string[]
  /**
   * The hash of the file (if applicable)
   */
  hash?: string
  /**
   * The size of the file (if applicable)
   */
  size?: number
  /**
   * The date of the file or folder
   */
  date?: number
  /**
   * The origin of the file (local or sdcard)
   */
  origin: 'local' | 'sdcard'
  /**
   * References to related resources and downloads
   */
  refs?: Refs
  /**
   * Gcode analysis information (if applicable)
   */
  gcodeAnalysis?: GcodeAnalysis
  /**
   * Print information (if applicable)
   */
  print?: Print
  /**
   * Children of the folder (if applicable)
   */
  children?: File[]
}

/**
 * References to related resources and downloads
 */
export interface Refs {
  /**
   * Resource URL
   */
  resource: string
  /**
   * Download URL
   */
  download?: string
}

/**
 * Gcode analysis information
 */
export interface GcodeAnalysis {
  /**
   * Estimated print time of the file
   */
  estimatedPrintTime: number
  /**
   * Filament information
   */
  filament: Filament
}

/**
 * Filament information
 */
export interface Filament {
  /**
   * Length of the filament
   */
  length: number
  /**
   * Volume of the filament
   */
  volume: number
}

/**
 * Print information
 */
export interface Print {
  /**
   * Number of print failures
   */
  failure: number
  /**
   * Number of print successes
   */
  success: number
  /**
   * Information about the last print
   */
  last: Last
}

/**
 * Information about the last print
 */
export interface Last {
  /**
   * Date of the last print
   */
  date: number
  /**
   * Whether the last print was successful
   */
  success: boolean
}

/**
 * Response of the GET /api/files API call
 */
export interface FilesGetResponse {
  /**
   * Information about the available files and folders
   */
  files: File[]
  /**
   * Information about the remaining disk space
   */
  free: string
}

export interface FilesGetRequest {
  /**
   * If set to true, forces a refresh, overriding the cache.
   */
  force: boolean

  /**
   * If set to true, return all files and folders recursively. Otherwise only return items on same level.
   */
  recursive: boolean

  /**
   * The origin location from which to retrieve the files. Currently only local and sdcard are supported,
   * with local referring to files stored in OctoPrint’s uploads folder and sdcard referring to files
   * stored on the printer’s SD card (if available).
   */
  location: 'local' | 'sdcard'
}

export interface FilesPostRequest {

  location: 'local' | 'sdcard'
  path: string
  select: boolean
  print: boolean
  userdata: string
  foldername: string
}
