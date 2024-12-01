import conf from "../conf/conf";
import { Client, Databases, ID, Query, Storage } from "appwrite";

export class Services {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //---to create post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.log("Appwrite :: createPost :: Error :", error);
    }
  }

  //---to updatepost
  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite :: updatePost :: Error :", error);
    }
  }

  //---to delete post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite :: deletePost :: Error :", error);
      return false;
    }
  }

  //--to get specific post via slug
  async getPost(slug) {
    try {
      await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite :: getPost :: Error :", error);
    }
  }

  //---to get only post having status active
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite :: getPosts :: Error :", error);
      return false;
    }
  }

  //---to upload images
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite :: uploadFile :: Error :", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite :: deleteFile :: Error :", error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Services();

export default service;
