import { WithFirebaseApp, WithAsyncState } from '@/types';
import { Firestore, DocumentData, FirestoreDataConverter } from 'firebase/firestore';

/**
 * Controls data fetching strategy for Firestore operations
 *
 * @enum
 *
 * @example
 * ```typescript
 * const { data } = useDoc('posts/1', { cache: RefCache.realtime });
 * ```
 *
 * @inline
 * @group Firestore
 * @category Interfaces
 */
export enum RefCache {
  /**
   * Subscribes to real-time changes. Default value.
   */
  liveServer = 'liveServer',

  /**
   * Subscribes to real-time changes including metadata changes.
   */
  liveServerMetadata = 'liveServerMetadata',

  /**
   * Fetch from server first, falls back to cache if server unavailable
   * Default behavior for most Firestore operations.
   */
  // oneServerOrCache = 'oneServerOrCache',
  one = 'one',

  /**
   * Fetch from cache first, falls back to server only if cache miss.
   *
   * Useful for optimizing read performance
   */
  oneCacheOrServer = 'oneCacheOrServer',

  /**
   * Fetches from both cache and server. Uses cache data first then updates with server data.
   *
   * Useful for performant UIs that need to display cached data immediately but also want to update with fresh data
   */
  oneCacheAndServer = 'oneCacheAndServer',

  /**
   * Only fetches from cache, error if cache miss.
   *
   * Useful for offline-only applications
   */
  oneCache = 'oneCache',

  /**
   * Only fetches from server, error if server unreachable.
   *
   * Useful when fresh data is critical
   */
  oneServer = 'oneServer',
}

/**
 * Anything that has reference to a Firestore instance.
 * @interface WithFirestore
 * @internal
 */
export type WithFirestore = {
  /** The Firestore instance */
  db: Firestore;
};

/**
 * Options for the `useDocRef` hook.
 * @interface FirestoreRefOptions<T>
 * @template T - The type of document data if converter is used.
 * @group Firestore
 * @category Interfaces
 */
export type RefOptions<T = DocumentData> = Partial<WithFirebaseApp & WithFirestore> & {
  /** Data converter for the document reference. */
  converter?: FirestoreDataConverter<T>;
  /** The cache strategy to use for listening or fetching Firestore data. Defaults to `realtime` */
  cache?: RefCache;
};

/**
 * Result object for Firestore operations.
 * @interface FirestoreResult<T, S>
 * @template T - The type of document data
 * @template S - The type of Firestore snapshot
 * @group Firestore
 * @category Interfaces
 */
export type RefResult<T, S> = WithAsyncState & {
  /** The document data */
  data?: T;
  /** The Firestore snapshot */
  snapshot: S | null;
};