import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

// CLOUDANT CREDENTIALS
// Warning : Use Environment variable in production instead
const CLOUDANT_URL = "URL"
const CLOUDANT_USERNAME = "USERNAME"
const CLOUDANT_PASSWORD = "PASSWORD"
const BASIC_AUTH = 'Basic ' + btoa(CLOUDANT_USERNAME + ':' + CLOUDANT_PASSWORD);

@Injectable({
  providedIn: 'root'
})

/**
 * Cloudant Service allow to connect on a cloudant db as a service
 */
export class CloudantService {

  constructor(private http: HttpClient){}
  
  // HTTP HEADERS
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': BASIC_AUTH
    })
  };

  /**
   * Create a new database in the cloudant instance
   * @param db database name
   */
  createDB(db: string): Observable<{}> {
    const url = `${CLOUDANT_URL}/${db}`
    return this.http.put(url, '' , this.httpOptions)
  }

  /**
   * Create a new document in the cloudant db
   * @param db database name
   * @param docId document id
   * @param doc document to create
   */
  createDoc(db: string, doc: string): Observable<{}> {
    const url = `${CLOUDANT_URL}/${db}`;
    return this.http.post<{}>(url, doc, this.httpOptions)
  }

  /**
   * Get a document docId from the cloudant db
   * @param db database name
   * @param docId document id
   */
  getDoc(db: string, docId: string): Observable<{}>  {
    const url = `${CLOUDANT_URL}/${db}/${docId}`;
    return this.http.get<{}>(url, this.httpOptions)

  }

  /**
   * Update a document in the cloudant db. The updated doc must contain the id and the old document's revision
   * @param db database name
   * @param docId document id
   * @param doc document to update
   */
  updateDoc(db: string, docId: string, doc: string): Observable<{}> {
    const url = `${CLOUDANT_URL}/${db}/${docId}`;
    return this.http.post<{}>(url, doc, this.httpOptions)
  }

  /**
   * Delete a document in the cloudant db.
   * @param db  database name
   * @param docId document id
   */
  deleteDoc(db: string, docId: string): Observable<{}> {
    const url = `${CLOUDANT_URL}/${db}/${docId}`;
    return this.http.delete<{}>(url, this.httpOptions)
  }

}